import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";

import { database } from "./database";
import { authentication } from "./middlewares/auth";
import routes from "./routes";

export const application = async () => {
    const app = Fastify();

    app.register(rateLimit, {
        ban: 1,
        timeWindow: "30 seconds",
        max: 100,
        
    });

    await routes(app);

    app.addHook("onRequest", authentication);

    await database.initialize();

    return app;
}
