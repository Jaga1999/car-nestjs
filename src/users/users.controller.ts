import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './DTO/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async SignIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return await this.userService.findOne(parseInt(id));
  }

  @Get()
  async findByEmail(@Query('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Get()
  async findALL() {
    return await this.userService.findAll();
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.remove(parseInt(id));
  }
}
