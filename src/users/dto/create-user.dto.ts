import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createUserDto {
  @IsString()
  @MaxLength(150)
  userId: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  userPhoto: string;

  @IsArray()
  followers: string[];

  @IsArray()
  following: string[];
}

export class userBasicInfoDto {
  @IsString()
  @MaxLength(150)
  userId: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  userPhoto: string;
}
