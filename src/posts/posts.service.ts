import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsService } from 'src/comments/comments.service';
import { createCommentDto } from 'src/comments/dto/create-comment.dto';
import { IComment } from 'src/comments/interfaces/comments';
import { createPostDto } from './dto/create-post.dto';
import { IPost } from './interfaces/posts';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private postModel: Model<IPost>,
    @InjectModel('Comment') private commentsModel: Model<IComment>,
    private commentsService: CommentsService,
  ) {}

  async createPost(post: createPostDto, file: Express.Multer.File) {
    console.log(file);
    try {
      const newPost = new this.postModel({
        userId: post.userId,
        actualLocation: post.actualLocation,
        originCountry: post.originCountry,
        description: post.description,
        postPhoto: file ? file.path : null,
      });
      return await newPost.save();
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts() {
    try {
      const posts = await this.postModel
        .find()
        .populate({
          path: 'userId',
          select: 'firstName lastName username userPhoto',
        })
        .populate({
          path: 'comments',
          select: 'description createdAt',
        });
      return posts;
    } catch (error) {
      console.error(error);
    }
  }

  async addCommentToPost(comment: createCommentDto, postId: string) {
    const commentToAdd = await this.commentsService.addComment(comment, postId);
    try {
      const updatedPost = await this.postModel.findByIdAndUpdate(
        postId,
        { $push: { comments: commentToAdd._id } },
        { new: true },
      );
      return updatedPost;
    } catch (error) {
      console.error(error);
    }
  }

  async removeCommentFromPost(postId: string, commentId: string) {
    const commentToRemove = await this.commentsService.deleteUser(commentId);

    try {
      const updatedPost = await this.postModel.findByIdAndUpdate(
        postId,
        { $pull: { comments: commentToRemove._id } },
        { new: true },
      );
      return updatedPost;
    } catch (error) {
      console.error(error);
    }
  }

  async getPostById(id: string) {
    try {
      const post = await this.postModel
        .findById(id)
        .populate({
          path: 'userId',
          select: 'firstName lastName username userPhoto',
        })
        .populate({
          path: 'comments',
          select: 'description createdAt',
          populate: {
            path: 'userId',
            select: 'firstName lastName username userPhoto',
          },
        })
        .exec();
      return post;
    } catch (error) {
      console.error(error);
    }
  }

  async getPostByUser(userId: string) {
    try {
      const post = await this.postModel
        .find({ userId: userId })
        .populate({
          path: 'userId',
          select: 'firstName lastName username userPhoto',
        })
        .exec();
      return post;
    } catch (error) {
      console.error(error);
    }
  }

  async updatePost(
    post: createPostDto,
    file: Express.Multer.File,
    postId: string,
  ) {
    try {
      const postInfo = await this.postModel.findById(postId);
      const postToUpdate = await this.postModel.findByIdAndUpdate(postId, {
        actualLocation: post.actualLocation,
        originCountry: post.originCountry,
        description: post.description,
        postPhoto: file ? file.path : postInfo.postPhoto,
      });
      return postToUpdate;
    } catch (error) {
      console.error(error);
    }
  }

  async deletePost(postId: any) {
    try {
      const deletedPost = await this.postModel.findByIdAndDelete(postId.id);
      return deletedPost;
    } catch (error) {
      console.error(error);
    }
  }

  async likePost(postAndUserIds: any) {
    try {
      const post = await this.postModel.findById(postAndUserIds.postId);
      const isLiked = post.likes.includes(postAndUserIds.userId);
      const userIdIndex = post.likes.indexOf(postAndUserIds.userId);

      if (isLiked) {
        post.likes.splice(userIdIndex, 1);
      } else {
        post.likes.push(postAndUserIds.userId);
      }

      const updatedPost = await this.postModel.findByIdAndUpdate(
        postAndUserIds.postId,
        { likes: post.likes },
        { new: true },
      );
      return updatedPost;
    } catch (error) {
      console.error(error);
    }
  }
}
