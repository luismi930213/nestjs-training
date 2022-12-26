import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from 'src/models/article.model';
import { ArticleController } from '../article/article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleModel])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
