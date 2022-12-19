import { Column, Entity } from "typeorm";
import { BaseModel } from "./basemodel";

@Entity({ name: 'users' })
export class UserModel extends BaseModel {

  @Column()
  email: string;

  @Column()
  password: string;
}