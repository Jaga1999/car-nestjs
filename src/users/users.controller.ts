import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './DTO/createUser.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const CreatedUser = this.userService.create(body.email, body.password);
    return CreatedUser;
  }
}
