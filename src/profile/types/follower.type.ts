import { UserModel } from "src/models/user.model";

export type FollowingType = Partial<UserModel> & { following: boolean }