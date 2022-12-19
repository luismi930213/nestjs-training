import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { IBaseService } from "src/interfaces/iBaseService.service";
import { UserModel } from "src/models/user.model";
import { Repository } from "typeorm";
import { SaveUserDto } from "./dto/saveUser.dto";
@Injectable()
export class UserService implements IBaseService<UserModel, SaveUserDto>  {

  constructor(@InjectRepository(UserModel) private readonly _userRepository: Repository<UserModel>) { }

  async findAll(): Promise<UserModel[]> {
    return await this._userRepository.find();
  }
  findOne(id: number): UserModel {
    throw new Error("Method not implemented.");
  }
  save(item: SaveUserDto): any {
    return item
  }
  remove(id: number): void {
    throw new Error("Method not implemented.");
  }


}
