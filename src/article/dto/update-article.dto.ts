import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateArticleDto {

    @IsOptional()
    @IsNotEmpty()
    readonly title?: string;

    @IsOptional()
    readonly description?: string;

    @IsOptional()
    readonly body?: string;

    @IsOptional()
    readonly tagList?: string[];
}