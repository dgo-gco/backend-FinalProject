import { IsString, MaxLength } from 'class-validator';

export class createFollowerDto {
  @IsString()
  @MaxLength(150)
  follower: string;

  @IsString()
  @MaxLength(150)
  following: string;
}
