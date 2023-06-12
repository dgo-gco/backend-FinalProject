import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly userId: string;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  password: string;
  userPhoto: string;
}
