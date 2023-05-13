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
    console.log(username);
    const email = this.userModel.findOne({ username });
    return email;
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
        return 'All fields are required';
      }
      const isUserRegistered = await this.userModel.findOne({
        email: user.email,
      });
      if (isUserRegistered) {
        return 'This user already exists!';
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      newUser.password = hashedPassword;
      return await newUser.save();
    } catch (error) {
      return error;
    }
  }
}
