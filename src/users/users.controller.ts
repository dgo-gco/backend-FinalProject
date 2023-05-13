import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUser(@Body() createUserDto: createUserDto) {
    try {
      console.log(createUserDto);
      const user = await this.usersService.findOne(createUserDto.email);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  createUsers(@Body() user: createUserDto): object {
    return this.usersService.registerUser(user);
  }
}
