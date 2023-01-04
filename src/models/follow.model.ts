import { Column, Entity } from "typeorm";
import { BaseModel } from "./basemodel";

@Entity('follows')
export class FollowModel extends BaseModel {

    @Column({ nullable: false })
    followerId: number

    @Column({ nullable: false })
    followingId: number
}