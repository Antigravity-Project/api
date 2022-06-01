import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../database/entities/user.entity";
import { HttpStatusCode } from "../enums/http-status";
import { UserService } from "../service/user-service";

export class UserController {
    static async getUsers(req: FastifyRequest<{ Params: { id?: string } }>, res: FastifyReply) {
        if (!req.params.id) {
            return await UserService.getAll();
        }

        const user = await UserService.get(req.params.id);

        if (!user) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send({ message: "User not found." });
        }

        return user;
    }

    static async createUser(req: FastifyRequest<{ Body: User }>, res: FastifyReply) {
        if (!req.body._id) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .send({
                    message: "Invalid body.",
                });
        }

        const userAlreadyExists = await UserService.get(req.body._id);

        if (userAlreadyExists) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .send({
                    message: "User already exists.",
                });
        }
        console.log("User create");
        return await UserService.create(req.body);
    }

    static async deleteUser(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        const user = await UserService.get(req.params.id);

        if (!user) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send({ message: "User not found." });
        }

        return await UserService.delete(user);
    }

    static async updateUser(req: FastifyRequest<{ Body: User }>, res: FastifyReply) {
        if (!req.body._id || Object.keys(req.body).length < 2) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .send({
                    message: "Invalid body.",
                });
        }

        const user = await UserService.get(req.body._id);

        if (!user) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send({ message: "User not found." });
        }

        return await UserService.update(req.body);
    }
}