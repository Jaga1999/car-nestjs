import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  signUp(email: string, password: string) {
    // see If the email is in use
    const user = this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Email Already Registered');
    }

    // hash the user's password

    // Create a New User and Save it

    //return the user
  }

  signIn() {}
}
