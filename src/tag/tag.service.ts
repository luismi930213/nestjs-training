import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { IBaseService } from "src/interfaces/iBaseService.service";
import { TagModel } from "src/models/tag.model";
import { Repository } from "typeorm";
@Injectable()
export class TagService implements IBaseService<TagModel, any>  {

  constructor(@InjectRepository(TagModel) private readonly _tagRepository: Repository<TagModel>) { }

  update(id: number, item: any): Promise<TagModel> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<TagModel[]> {
    return await this._tagRepository.find();
  }
  findOne(id: number): Promise<TagModel> {
    throw new Error("Method not implemented.");
  }
  create(item: TagModel): Promise<TagModel> {
    throw new Error("Method not implemented.");
  }
  remove(id: number): void {
    throw new Error("Method not implemented.");
  }


}
