import Fastify from "fastify";
import { database } from "./database";
import routes from "./routes";

export const application = async () => {
    const app = Fastify();

    await routes(app);

    await database.initialize();

    return app;
}
