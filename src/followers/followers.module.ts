import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { FollowersController } from './followers.controller';
import { FollowersService } from './followers.service';
import { FollowerSchema } from './schemas/follower.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Follower', schema: FollowerSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [FollowersController],
  providers: [FollowersService],
  exports: [FollowersService],
})
export class FollowersModule {}
