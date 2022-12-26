import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import slugify from "slugify";
import { IBaseService } from "src/interfaces/iBaseService.service";
import { ArticleModel } from "src/models/article.model";
import { DeleteResult, Repository } from "typeorm";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class ArticleService implements IBaseService<ArticleModel, CreateArticleDto> {

    constructor(@InjectRepository(ArticleModel) private readonly _articleRepository: Repository<ArticleModel>) { }

    findAll(): Promise<ArticleModel[]> {
        throw new Error("Method not implemented.");
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

}