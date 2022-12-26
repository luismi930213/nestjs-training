import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticle1672051664422 implements MigrationInterface {
    name = 'CreateArticle1672051664422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "body" character varying, "tagList" text NOT NULL, "favoritesCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
