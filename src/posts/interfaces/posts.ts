import { Document } from 'mongoose';

export interface IPost extends Document {
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly location: string;
  description: string;
  userPhoto: string;
  postPhoto: string;
  likes: object;
  comments: [string];
}
