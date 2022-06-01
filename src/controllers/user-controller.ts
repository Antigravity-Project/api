import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../database/entities/user.entity";
import { UserService } from "../service/user-service";

export class UserController {
    static async getUsers(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        const user = await UserService.get(req.params.id);

        if (!user) {
            return res
                .status(404)
                .send({ message: "User not found" });
        }

        return user;
    }

    static async createUser(req: FastifyRequest<{ Body: User }>, res: FastifyReply) {
        const { 
            id,
            betCooldown,
            blockList,
            coin,
            dailyCooldown,
            engines,
            profile 
        } = req.body;

        return await UserService.create({
            id,
            betCooldown,
            blockList,
            coin,
            dailyCooldown,
            engines,
            profile
        });
    }

    static async deleteUser(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        return await UserService.delete(req.params.id);
    }
}