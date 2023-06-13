import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { createPostDto } from './dto/create-post.dto';
import { IPost } from './interfaces/posts';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private postModel: Model<IPost>) {}

  async createPost(
    post: createPostDto,
    user: createUserDto,
    file: Express.Multer.File,
  ) {
    try {
      const userInfo = user;
      const newPost = new this.postModel({
        userId: userInfo.userId,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        location: post.location,
        description: post.description,
        userPhoto: 'link to photo',
        postPhoto: file.filename,
        likes: {},
        comments: [],
      });
      return await newPost.save();
      // We need to return all the posts so the front has an updated list of all the posts. WITH STATE
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts() {
    try {
      const posts = await this.postModel.find();
      console.log(posts);
      return posts;
    } catch (error) {
      console.error(error);
    }
  }

  async getPostById(id: string) {
    try {
      const post = await this.postModel.findById(id);
      return post;
    } catch (error) {
      console.error(error);
    }
  }

  async addComment(post, user, req) {
    try {
      const postToComment = await this.postModel.findById(post.userId);
      //console.log(postToComment);
      //console.log(req);
      return postToComment;
    } catch (error) {
      console.error(error);
    }
  }

  // async likePost() {
  //   try {
  //     const { id } = req.params;
  //     const { userId } = req.body;
  //     const post = await this.postModel.findById(id);
  //     const isLiked = post.likes.get(userId);

  //     if (isLiked) {
  //       post.likes.delete(userId);
  //     } else {
  //       post.likes.set(userId, true);
  //     }

  //     const updatedPost = await this.postModel.findByIdAndUpdate(
  //       id,
  //       { likes: post.likes },
  //       { new: true },
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
