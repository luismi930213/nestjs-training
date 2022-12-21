import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { IBaseService } from "src/interfaces/iBaseService.service";
import { UserModel } from "src/models/user.model";
import { Repository } from "typeorm";
import { SaveUserDto } from "./dto/saveUser.dto";
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from "src/config";
import { HttpException, HttpStatus } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUser.dto";
import { compareSync } from 'bcrypt'
@Injectable()
export class UserService implements IBaseService<UserModel, SaveUserDto>  {

  constructor(@InjectRepository(UserModel) private readonly _userRepository: Repository<UserModel>) { }

  async findAll(): Promise<UserModel[]> {
    return await this._userRepository.find();
  }

  findOne(id: number): UserModel {
    throw new Error("Method not implemented.");
  }

  async save(item: SaveUserDto): Promise<UserModel> {
    const itemCreate = new UserModel()
    const findUniqueEmail = await this._userRepository.findOneBy({ email: item.email })
    const findUniqueUsername = await this._userRepository.findOneBy({ username: item.username })
    if (!!findUniqueEmail || !!findUniqueUsername)
      throw new HttpException('Username or email taken', HttpStatus.UNPROCESSABLE_ENTITY)
    Object.assign(itemCreate, item);
    let user = await this._userRepository.save(itemCreate)
    const token = sign({
      id: user.id,
      email: user.email,
      username: user.username,
    }, JWT_SECRET)
    return Object.assign(user, { token })
  }

  async login(item: LoginUserDto): Promise<UserModel> {
    const user = await this._userRepository.findOne(
      {
        where: { email: item.email },
        select: ['id', 'bio', 'password', 'email', 'username']
      },
    )
    if (!user)
      throw new HttpException('Not valid password or email', HttpStatus.UNAUTHORIZED)
    if (!compareSync(item.password, user.password))
      throw new HttpException('Not valid password or email', HttpStatus.UNAUTHORIZED)
    delete user.password  
    return user;
  }

  remove(id: number): void {
    throw new Error("Method not implemented.");
  }


}
