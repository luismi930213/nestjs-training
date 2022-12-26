import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "./basemodel";
import { UserModel } from "./user.model";

@Entity('articles')
export class ArticleModel extends BaseModel {

    @Column({ nullable: false })
    slug: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    body: string;

    @Column({ type: 'simple-array' })
    tagList: string[]

    @Column({ default: 0 })
    favoritesCount: number;

    @ManyToOne(() => UserModel, (user) => user.articles, { eager: true })
    author: UserModel;
}