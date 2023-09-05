import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/users/interfaces/users';
import { createFollowerDto } from './dto/create-follower.dto';
import { IFollower } from './interfaces/followers';

@Injectable()
export class FollowersService {
  constructor(
    @InjectModel('Follower') private followerModel: Model<IFollower>,
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}

  async addFollower(newFollow: createFollowerDto) {
    try {
      const newFollower = new this.followerModel({
        follower: newFollow.follower,
        following: newFollow.following,
      });
      return await newFollower.save();
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowRelation(userId: string) {
    try {
      const followRelation = await this.followerModel.findOneAndDelete({
        following: userId,
      });
      return followRelation;
    } catch (error) {
      console.error(error);
    }
  }
}
