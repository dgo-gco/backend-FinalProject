import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Follower extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  follower: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  following: User;
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);
