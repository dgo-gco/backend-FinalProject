import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true, minLength: 6, maxLength: 100 })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  userPhoto: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
