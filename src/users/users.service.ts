import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/users';
import { createUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async getUsers() {
    return 'hello';
  }

  async findOne(username: string): Promise<IUser | undefined> {
    const user = this.userModel.findOne({ username });
    console.log('user service', user);
    return user;
  }

  async findUserById(id: string): Promise<IUser | undefined> {
    const user = this.userModel.findById(id);
    return user;
  }

  async registerUser(user: createUserDto) {
    try {
      const newUser = new this.userModel(user);
      if (
        !(
          user.username ||
          user.firstName ||
          user.lastName ||
          user.email ||
          user.password
        )
      ) {
        return 'All fields are required XD';
      }
      const isUserRegistered = await this.userModel.findOne({
        email: user.email,
      });
      if (isUserRegistered) {
        return 'This user already exists!';
      }
      const usernameExists = await this.userModel.findOne({
        username: user.username,
      });
      if (usernameExists) {
        return 'This username has been taken. Choose another one.';
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      newUser.password = hashedPassword;
      newUser.userPhoto = '';
      return await newUser.save();
    } catch (error) {
      return error;
    }
  }

  async uploadPhoto(
    user: createUserDto,
    userId: string,
    file: Express.Multer.File,
  ) {
    try {
      const uploadUserPhoto = await this.userModel.findByIdAndUpdate(
        userId,
        user,
      );
      if (!uploadUserPhoto) {
        return 'User not found.';
      }
      uploadUserPhoto.userPhoto = file.filename;
      return await uploadUserPhoto.save();
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(user: createUserDto, userId: string) {
    try {
      const userToUpdate = await this.userModel.findByIdAndUpdate(userId, user);
      if (!userToUpdate) {
        return 'User not found.';
      }
      return userToUpdate;
    } catch (error) {
      console.error(error);
    }
  }
}
