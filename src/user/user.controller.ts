import { Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Body, UsePipes } from '@nestjs/common/decorators';
import { UserModel } from 'src/models/user.model';
import { LoginUserDto } from './dto/loginUser.dto';
import { SaveUserDto } from './dto/saveUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private _userService: UserService) { }
    @Get()
    findAll(): Promise<UserModel[]> {
        return this._userService.findAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async save(@Body('user') saveUser: SaveUserDto): Promise<UserModel> {
        return this._userService.save(saveUser)
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUser: LoginUserDto): Promise<UserModel> {
        return this._userService.login(loginUser)
    }
}
