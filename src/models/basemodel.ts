import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}