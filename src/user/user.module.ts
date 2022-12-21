import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule { }
