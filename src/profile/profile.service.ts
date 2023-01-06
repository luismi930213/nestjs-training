import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FollowModel } from "src/models/follow.model";
import { UserModel } from "src/models/user.model";
import { Repository } from "typeorm";
import { FollowingType } from "./types/follower.type";

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(UserModel) private readonly _userRepository: Repository<UserModel>,
        @InjectRepository(FollowModel) private readonly _followRepository: Repository<FollowModel>) { }

    async follow(username: string, userId: number): Promise<FollowingType> {
        const userToFollow = await this._userRepository.findOne({ where: { username } })
        if (!userToFollow)
            throw new HttpException('Profile does not exists', HttpStatus.UNPROCESSABLE_ENTITY)
        if (userToFollow.id === userId)
            throw new HttpException('Follower and following can not be equal', HttpStatus.BAD_REQUEST)
        let follow = await this._followRepository.findOneBy({ followerId: userId, followingId: userToFollow.id })
        if (!follow) {
            const followToCreate = await this._followRepository.create({ followerId: userId, followingId: userToFollow.id })
            follow = await this._followRepository.save(followToCreate)
        }

        return { ...userToFollow, following: true }
    }

    async unfollow(username: string, userId: number): Promise<FollowingType> {
        const userToFollow = await this._userRepository.findOne({ where: { username } })
        if (!userToFollow)
            throw new HttpException('Profile does not exists', HttpStatus.UNPROCESSABLE_ENTITY)
        await this._followRepository.delete({ followerId: userId, followingId: userToFollow.id })
        return { ...userToFollow, following: false }
    }

    async getProfile(username: string, userId: number): Promise<FollowingType> {
        const userExists = await this._userRepository.findOne({ where: { username } })
        if (!userExists)
            throw new HttpException('Profile does not exists', HttpStatus.UNPROCESSABLE_ENTITY)
        const follow = await this._followRepository.findOne({ where: { followerId: userId } })
        return { ...userExists, following: !!follow }
    }
}