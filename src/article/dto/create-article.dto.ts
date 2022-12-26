import { IsNotEmpty, IsOptional } from "class-validator";
import { UserModel } from "src/models/user.model";

export class CreateArticleDto{

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly body: string;

    @IsOptional()
    readonly tagList?: string[];

    author?: UserModel;
}