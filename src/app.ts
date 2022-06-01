import Fastify from "fastify";
import { database } from "./database";
import { authentication } from "./middlewares/auth";
import routes from "./routes";

export const application = async () => {
    const app = Fastify();

    await routes(app);

    app.addHook("onRequest", authentication);

    await database.initialize();

    return app;
}
