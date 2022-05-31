import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class BaseEntity {
    @ObjectIdColumn({ name: "_id" })
    _id: string;
}