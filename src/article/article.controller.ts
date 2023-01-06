import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators';
import { ArticleModel } from 'src/models/article.model';
import { UserModel } from 'src/models/user.model';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { DeleteResult } from 'typeorm';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleResponse } from './types/article-response.type';

@Controller('articles')
export class ArticleController {

    constructor(private readonly _articleService: ArticleService) { }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Query() query: unknown): Promise<ArticleResponse> {
        return await this._articleService.findAll(query)
    }

    @Get('feed')
    @UseGuards(AuthGuard)
    async feed(@CurrentUser('id') userId: number, @Query() query: any): Promise<ArticleResponse> {
        return await this._articleService.getFeed(userId, query)
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@CurrentUser() currentUser: UserModel, @Body() createArticle: CreateArticleDto): Promise<ArticleModel> {
        createArticle.author = currentUser;
        return await this._articleService.create(createArticle)
    }

    @Post(':id/likeDislike')
    @UseGuards(AuthGuard)
    async likeDislikeArticle(
        @CurrentUser('id') currentUserId: number,
        @Param('id') id: number,
        @Body('like') like: boolean): Promise<ArticleModel> {
        return await this._articleService.likeArticle(currentUserId, id, like)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id: number, @Body() updateArticle: UpdateArticleDto): Promise<ArticleModel> {
        return await this._articleService.update(id, updateArticle)
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async findOne(@Param('id') id: number): Promise<ArticleModel> {
        return await this._articleService.findOne(id)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    async remove(@Param('id') id: number): Promise<DeleteResult> {
        return await this._articleService.remove(id)
    }

}
