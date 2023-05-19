import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('getall')
  async getAll() {
    return this.usersService.getUsers();
  }

  @Get()
  async getUser(@Body() createUserDto: createUserDto) {
    try {
      const user = await this.usersService.findOne(createUserDto.email);
      console.log('this getUser controller', user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Post('register')
  createUsers(@Body() user: createUserDto): object {
    return this.usersService.registerUser(user);
  }
}
