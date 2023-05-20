import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { createPostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  static path = './uploads';
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('postPhoto', {
      storage: diskStorage({
        destination: PostsController.path,
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
  async createPost(
    @Body() post: createPostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('FILE: ', file);
    const user = await this.usersService.findUserById(post.userId);
    console.log(user);
    return this.postsService.createPost(post, user, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-posts')
  async getPosts() {
    return this.postsService.getPosts();
  }
}
