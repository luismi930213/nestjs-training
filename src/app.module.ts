import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from './ormconfig';
import { TagModule } from './tag/tag.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule, UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
 }
