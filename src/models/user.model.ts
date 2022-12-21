import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseModel } from "./basemodel";
import { hash } from 'bcrypt'

@Entity({ name: 'users' })
export class UserModel extends BaseModel {

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async insertHook() {
    this.password = await hash(this.password, 1)
  }
}