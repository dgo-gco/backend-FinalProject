import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  static path = './uploads';
  constructor(private usersService: UsersService) {}

  @Get()
  async getUser(@Body() createUserDto: createUserDto) {
    try {
      const user = await this.usersService.findOne(createUserDto.email);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async getUserById(@Param() params: any) {
    return this.usersService.findUserById(params.id);
  }

  @Get(':username/user')
  async getUserByUsername(@Param() params: any) {
    return this.usersService.findUserByUsername(params.username);
  }

  @Post('register')
  createUsers(@Body() user: createUserDto): object {
    return this.usersService.registerUser(user);
  }

  @Post(':id/upload/userphoto')
  @UseInterceptors(
    FileInterceptor('userPhoto', {
      storage: diskStorage({
        destination: UsersController.path,
        filename: (req, file, cb) => {
          const filename: string = Array(10)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${filename}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(
    @Body() user: createUserDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return this.usersService.uploadPhoto(user, req.params.id, file);
    } catch (error) {
      console.error(error);
    }
  }

  @Put(':id/update')
  async updateUser(@Body() user: createUserDto, @Req() req: Request) {
    try {
      const updateUser = await this.usersService.updateUser(
        user,
        req.params.id,
      );
      return updateUser;
    } catch (error) {
      console.error(error);
    }
  }

  @Delete(':id')
  async deleteUser(@Param() params) {
    return this.usersService.deleteUser(params);
  }

  @Post('follow/:id')
  async follow(@Param('id') params, @Body() userToFollowId: string) {
    return this.usersService.handleFollow(params, userToFollowId);
  }

  @Delete('unfollow/:id')
  async unfollow(@Param() params, @Body() id) {
    return this.usersService.unfollowUser(params, id);
  }
}
