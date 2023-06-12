import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop()
  userId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  userPhoto: string;

  @Prop()
  postPhoto: string;

  @Prop()
  likes: string[];

  @Prop()
  comments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
