import type { RouteOptions } from "fastify";
import { UserController } from "../controllers/user-controller";

const routeUsers: RouteOptions[] = [
    {
        url: "/users/:id",
        method: "GET",
        handler: UserController.getUsers,
    },
    {
        url: "/users",
        method: "POST",
        handler: UserController.createUser,
    },
    {
        url: "/users/:id",
        method: "DELETE",
        handler: UserController.deleteUser,
    }
];

export default routeUsers;
