import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import { IBaseService } from "src/interfaces/iBaseService.service";
import { ArticleModel } from "src/models/article.model";
import { FollowModel } from "src/models/follow.model";
import { UserModel } from "src/models/user.model";
import { DeleteResult, In, Repository } from "typeorm";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ArticleResponse } from "./types/article-response.type";

@Injectable()
export class ArticleService implements IBaseService<ArticleModel, CreateArticleDto> {

    constructor(
        @InjectRepository(ArticleModel) private readonly _articleRepository: Repository<ArticleModel>,
        @InjectRepository(FollowModel) private readonly _followRepository: Repository<FollowModel>,
        @InjectRepository(UserModel) private readonly _userRepository: Repository<UserModel>) { }

    async findAll(query: any): Promise<ArticleResponse> {
        const result = await this._articleRepository.findAndCount(
            {
                where: { title: query.title, author: { username: query.username } },
                take: query.limit,
                skip: query.skip,
                order: { createdAt: 'DESC' },
                relations: {
                    author: true
                }
            })
        let response = { articles: [], count: 0 }
        if (!!result) {
            response.articles = result[0]
            response.count = result[1]
        }
        return response
    }

    async getFeed(userId: number, query: any): Promise<ArticleResponse> {
        const follows = await this._followRepository.find({ where: { followerId: userId } })
        if (!follows.length)
            return { articles: [], count: 0 }
        const userIds = follows.map(i => i.followingId)        
        const result = await this._articleRepository.findAndCount(
            {
                where: { title: query.title, author: { id: In(userIds) } },
                take: query.limit,
                skip: query.skip,
                order: { createdAt: 'DESC' },
                relations: {
                    author: true
                }
            })
        let response = { articles: [], count: 0 }
        if (!!result) {
            response.articles = result[0]
            response.count = result[1]
        }
        return response
    }

    async findOne(id: number): Promise<ArticleModel> {
        return await this._articleRepository.findOneBy({ id });
    }
    create(item: CreateArticleDto): Promise<ArticleModel> {
        const toCreate = this._articleRepository.create(item)
        toCreate.slug = this.getSlug(toCreate.title);
        return this._articleRepository.save(toCreate)
    }
    async update(id: number, item: UpdateArticleDto): Promise<ArticleModel> {
        const findById = await this._articleRepository.findOneBy({ id })
        if (!findById)
            throw new HttpException('The article is not in the system', HttpStatus.NOT_FOUND)
        Object.assign(findById, item)
        if (!!item.title)
            findById.slug = this.getSlug(item.title)
        return await this._articleRepository.save(findById);
    }
    async remove(id: number): Promise<DeleteResult> {
        const findById = await this._articleRepository.findOneBy({ id })
        if (!findById)
            throw new HttpException('The article is not in the system', HttpStatus.NOT_FOUND)
        return await this._articleRepository.delete({ id });
    }

    private getSlug(title: string): string {
        return slugify(title, { lower: true }) + '_' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
    }

    async likeArticle(userId: number, articleId: number, like: boolean): Promise<ArticleModel> {
        const article = await this._articleRepository.findOneBy({ id: articleId })
        const user = await this._userRepository.findOne({ where: { id: userId }, relations: ['favourites'] })
        if (!!like) {
            user.favourites.push(article)
            article.favoritesCount++;
        } else {
            user.favourites.splice(user.favourites.findIndex(item => item.id === article.id), 1)
            article.favoritesCount--;
        }

        await this._userRepository.save(user)
        await this._articleRepository.save(article)
        return article
    }

}