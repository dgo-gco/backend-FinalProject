import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { createFollowerDto } from './dto/create-follower.dto';
import { FollowersService } from './followers.service';

@Controller('followers')
export class FollowersController {
  constructor(private followersService: FollowersService) {}

  @Delete('unfollow/:id')
  async unfollow(@Param() params: string) {
    return this.followersService.deleteFollowRelation(params);
  }
}
