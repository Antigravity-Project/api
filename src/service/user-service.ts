import { MongoRepository } from "typeorm";
import { database } from "../database";
import { User } from "../database/entities/user.entity";

export class UserService {
    private static users: MongoRepository<User> = database.getMongoRepository<User>(User);

    static async getUserOnDB(_id: string) {
        return await this.users.findOneBy({ _id });
    }

    static async createUser(user: User) {
        if (await this.users.findOneBy({ id: user._id })) return { message: "User already exists!" };
        return await this.users.save(user);
    }
}