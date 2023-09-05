import { Document } from 'mongoose';

export interface IFollower extends Document {
  readonly follower: string;
  readonly following: string;
}
