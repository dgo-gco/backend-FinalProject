import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class createCommentDto {
  @IsString()
  @MaxLength(150)
  userId: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  postId: string;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  description: string;
}
