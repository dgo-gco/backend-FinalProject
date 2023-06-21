import { Document } from 'mongoose';
import { Comment } from 'src/comments/schemas/comment.schema';

export interface IPost extends Document {
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  actualLocation: string;
  originCountry: string;
  description: string;
  userPhoto: string;
  postPhoto: string;
  likes: string[];
  comments: Comment[];
}
