import type { RouteOptions } from "fastify";
import { UserController } from "../controllers/user-controller";

const routeUsers: RouteOptions[] = [
    {
        url: "/users/:id",
        method: "GET",
        //@ts-ignore
        handler: UserController.getUsers
    },
    {
        url: "/users",
        method: "POST",
        handler: UserController.createUser,
    }
];

export default routeUsers;
