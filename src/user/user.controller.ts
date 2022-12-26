import { Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Body, Param, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { UserModel } from 'src/models/user.model';
import { LoginUserDto } from './dto/loginUser.dto';
import { SaveUserDto } from './dto/saveUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private _userService: UserService) { }

    @Get('all')
    @UseGuards(AuthGuard)
    async findAll(): Promise<UserModel[]> {
        return await this._userService.findAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: number): Promise<UserModel> {
        return this._userService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async save(@Body('user') saveUser: SaveUserDto): Promise<UserModel> {
        return this._userService.create(saveUser)
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUser: LoginUserDto): Promise<UserModel> {
        return this._userService.login(loginUser)
    }
}
