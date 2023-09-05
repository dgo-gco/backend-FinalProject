import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { createFollowerDto } from './dto/create-follower.dto';
import { FollowersService } from './followers.service';

@Controller('followers')
export class FollowersController {
  constructor(private followersService: FollowersService) {}

  @Delete('unfollow')
  async unfollow(@Body() userId: string) {
    console.log('paraams', userId);
    return this.followersService.getFollowRelation(userId);
  }
}
