import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowModel } from 'src/models/follow.model';
import { UserModel } from 'src/models/user.model';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, FollowModel])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
