import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { FollowersModule } from 'src/followers/followers.module';
import { FollowerSchema } from 'src/followers/schemas/follower.schema';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Follower', schema: FollowerSchema },
    ]),
    MulterModule.register({
      dest: './uploads/users',
    }),
    FollowersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
