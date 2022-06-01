import { MongoRepository } from "typeorm";
import { database } from "../database";
import { User } from "../database/entities/user.entity";

export class UserService {
    private static users: MongoRepository<User> = database.getMongoRepository<User>(User);

    static async get(_id: string) {
        return await this.users.findOneBy({ _id });
    }

    static async getAll() {
        return await this.users.find();
    }

    static async create(userOptions: User) {
        const user = new User(userOptions);
        return this.users.save(user);
    }

    static async delete(user: User) {
        return await this.users.deleteOne(user);
    }

    static async update(props: User) {
        const user = await this.get(props._id);

        Object.assign(user, props);

        await this.users.update({ _id: props._id }, user);

        return user;
    }
}