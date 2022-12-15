import { Injectable } from "@nestjs/common/decorators";
import { IBaseService } from "src/interfaces/iBaseService.service";
import { TagModel } from "src/models/tag.model";
@Injectable()
export class TagService implements IBaseService<TagModel>  {

  findAll(): TagModel[] {
    return [{ id: 1, name: 'Hello TagModel', createdAt: new Date(), updatedAt: new Date() }];
  }
  findOne(id: number): TagModel {
    throw new Error("Method not implemented.");
  }
  save(item: TagModel): void {
    throw new Error("Method not implemented.");
  }
  remove(id: number): void {
    throw new Error("Method not implemented.");
  }


}
