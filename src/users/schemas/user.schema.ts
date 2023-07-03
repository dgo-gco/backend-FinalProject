import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, minLength: 6, maxLength: 100 })
  email: string;

  @Prop({ required: true, minLength: 8, maxLength: 100 })
  password: string;

  @Prop()
  userPhoto: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
