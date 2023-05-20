import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
  @MaxLength(100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  password: string;
}
