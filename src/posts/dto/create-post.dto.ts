import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Comment } from 'src/comments/schemas/comment.schema';

export class createPostDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  userId: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MaxLength(100)
  location: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  description: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  userPhoto: string;

  @IsString()
  @MaxLength(300)
  postPhoto: string;

  @IsString()
  @MaxLength(300)
  likes: object;

  @IsString()
  @MaxLength(300)
  comments: Comment[];
}
