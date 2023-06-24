import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/users';
import { createUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async findOne(username: string): Promise<IUser | undefined> {
    const user = this.userModel.findOne({ username });
    return user;
  }

  async findUserById(id: string): Promise<IUser | undefined> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async findUserByUsername(username: string): Promise<IUser | undefined> {
    try {
      const user = await this.userModel.findOne({ username: username });
      return user;
    } catch (error) {
      console.error(error);
    }
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
        return { status: 400, message: 'All fields are required' };
      }
      const isUserRegistered = await this.userModel.findOne({
        email: user.email,
      });
      if (isUserRegistered) {
        return {
          status: 409,
          message:
            'The email address is already in use. Please use a different email address.',
        };
      }
      const usernameExists = await this.userModel.findOne({
        username: user.username,
      });
      if (usernameExists) {
        return {
          status: 409,
          message: 'This username has been taken. Choose another one.',
        };
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      newUser.password = hashedPassword;
      newUser.userPhoto = '';
      const savedUser = await newUser.save();
      return { status: 200, data: savedUser };
    } catch (error) {
      return { status: 500, error: error.message };
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
      uploadUserPhoto.userPhoto = file.path;
      return await uploadUserPhoto.save();
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(user: createUserDto, userId: string) {
    try {
      const userToUpdate = await this.userModel.findByIdAndUpdate(userId, {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      });
      if (!userToUpdate) {
        return 'User not found.';
      }
      return userToUpdate;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(userId: any) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(userId.id);
      return deletedUser;
    } catch (error) {
      console.error(error);
    }
  }
}
