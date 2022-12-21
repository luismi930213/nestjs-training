import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { AuthGuard } from './guards/auth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    providers: [UserService, AuthGuard],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule { }
