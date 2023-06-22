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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createCommentDto } from 'src/comments/dto/create-comment.dto';
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
    return this.postsService.createPost(post, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-posts')
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Put('comment/:id')
  async addCommentToPost(
    @Body() comment: createCommentDto,
    @Param('id') params,
  ) {
    return this.postsService.addCommentToPost(comment, params);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPostById(@Param('id') params) {
    return this.postsService.getPostById(params);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getPostByUser(@Param('id') params) {
    return this.postsService.getPostByUser(params);
  }

  @UseGuards(JwtAuthGuard)
  @Put('like')
  async likePost(@Body() postAndUserIds: any) {
    return this.postsService.likePost(postAndUserIds);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param() params) {
    return this.postsService.deletePost(params);
  }
}
