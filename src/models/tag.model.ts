import { Column, Entity } from "typeorm";
import { BaseModel } from "./basemodel";

@Entity({ name: 'tags' })
export class TagModel extends BaseModel {

  @Column()
  name: string;
}