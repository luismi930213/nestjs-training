import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseModel } from "./basemodel";
import { hash } from 'bcrypt'
import { ArticleModel } from "./article.model";

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

  @OneToMany(() => ArticleModel, (article) => article.author)
  articles: ArticleModel[];

  @ManyToMany(() => ArticleModel)
  @JoinTable()
  favourites: ArticleModel[]

  @BeforeInsert()
  async insertHook() {
    this.password = await hash(this.password, 1)
  }
}