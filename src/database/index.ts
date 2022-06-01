import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

export const database = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    database: process.env.DATABASE_NAME,
    entities: [User],
});