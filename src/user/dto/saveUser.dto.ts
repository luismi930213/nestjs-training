import { IsNotEmpty, IsEmail } from "class-validator";

export class SaveUserDto {

    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}