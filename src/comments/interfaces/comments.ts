import { Document } from 'mongoose';

export interface IComment extends Document {
  readonly userId: string;
  readonly postId: string;
  readonly description: string;
}
