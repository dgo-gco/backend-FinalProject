import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from './comments.service';
import { createCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Post('add/:id')
  async commentPost(@Body() comment: createCommentDto, @Param('id') params) {
    return this.commentsService.addComment(comment, params);
  }

  @Get(':id')
  async commentsByPost(@Param('id') params: string) {
    return this.commentsService.getCommentsByPost(params);
  }
}
