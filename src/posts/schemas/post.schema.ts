import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Comment } from '../../comments/schemas/comment.schema';
@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  originCountry: string;

  @Prop()
  actualLocation: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  userPhoto: string;

  @Prop()
  postPhoto: string;

  @Prop()
  likes: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
