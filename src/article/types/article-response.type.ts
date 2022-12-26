import { ArticleModel } from "src/models/article.model";

export interface ArticleResponse {
    articles: ArticleModel[]
    count: number;
}