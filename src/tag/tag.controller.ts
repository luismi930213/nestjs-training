import { Controller, Get } from '@nestjs/common';
import { TagModel } from 'src/models/tag.model';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private _tagService: TagService) { }
  @Get()
  findAll(): Promise<TagModel[]> {
    return this._tagService.findAll();
  }
}
