import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModel } from 'src/models/tag.model';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagModel])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule { }
