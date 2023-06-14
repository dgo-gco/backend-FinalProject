import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createCommentDto } from './dto/create-comment.dto';
import { IComment } from './interfaces/comments';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private commentsModel: Model<IComment>) {}

  async addComment(comment: createCommentDto, post: string) {
    try {
      const newComment = new this.commentsModel({
        userId: comment.userId,
        postId: post,
        description: comment.description,
      });
      return await newComment.save();
    } catch (error) {
      console.error(error);
    }
  }

  async getCommentsByPost(postId: string) {
    try {
      const comments = await this.commentsModel.find({ postId });
      return comments;
    } catch (error) {
      console.error(error);
    }
  }
}
