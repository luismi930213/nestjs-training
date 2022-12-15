import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private _tagService: TagService) {}
  @Get()
  findAll() {
    return this._tagService.findAll();
  }
}
