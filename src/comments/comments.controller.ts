import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { createCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('add/:id')
  async commentPost(@Body() comment: createCommentDto, @Param('id') params) {
    return this.commentsService.addComment(comment, params);
  }

  @Get(':id')
  async commentsByPost(@Param('id') params: string) {
    return this.commentsService.getCommentsByPost(params);
  }

  @Put(':id')
  async updateComment(
    @Body() comment: createCommentDto,
    @Param('id') params: string,
  ) {
    return this.commentsService.updateComment(comment, params);
  }

  @Delete(':id')
  async deleteComment(@Param('id') params: string) {
    return this.commentsService.deleteUser(params);
  }
}
