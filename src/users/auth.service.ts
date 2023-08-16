import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUp(email: string, password: string) {
    // see If the email is in use
    const userExist = await this.userService.findByEmail(email);
    if (userExist) {
      throw new BadRequestException('Email Already Registered');
    }

    // hash the user's password
    // Generate the salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a New User and Save it
    const user = await this.userService.create(email, result);

    //return the user
    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const [salt, storedhash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedhash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect Password');
    }
    return user;
  }
}
