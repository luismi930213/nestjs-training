import { Controller, Get, Param } from '@nestjs/common';
import { Delete, Post, UseGuards } from '@nestjs/common/decorators';
import { UserModel } from 'src/models/user.model';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ProfileService } from './profile.service';
import { FollowingType } from './types/follower.type';

@Controller('profiles')
export class ProfileController {

    constructor(private readonly _profileService: ProfileService) { }

    @Get(':username')
    @UseGuards(AuthGuard)
    async getProfile(@Param('username') username: string, @CurrentUser('id') userId: number): Promise<FollowingType> {
        return await this._profileService.getProfile(username, userId)
    }

    @Post(':username/follow')
    @UseGuards(AuthGuard)
    async follow(@Param('username') username: string, @CurrentUser('id') userId: number): Promise<FollowingType> {
        return await this._profileService.follow(username, userId)
    }

    @Delete(':username/follow')
    @UseGuards(AuthGuard)
    async unfollow(@Param('username') username: string, @CurrentUser('id') userId: number): Promise<FollowingType> {
        return await this._profileService.unfollow(username, userId)
    }
}
