import { MongoRepository } from "typeorm";
import { database } from "../database";
import { User } from "../database/entities/user.entity";
import { ApiStatusEnum } from "../enums/api-errors";

export class UserService {
    private static users: MongoRepository<User> = database.getMongoRepository<User>(User);

    static async get(id: string) {
        return await this.users.findOneBy({ id });
    }

    static async create(userOptions: User) {
        if (await this.users.findOneBy({ id: userOptions.id }))
            throw {
                message: "User already exists",
                code: ApiStatusEnum.USER_EXIST,
            }
        const user = new User(userOptions);
        return this.users.save(user);
    }
}