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
      // We need to return all the posts so the front has an updated list of all the posts.
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
}
