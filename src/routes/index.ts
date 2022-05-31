import { FastifyInstance } from "fastify";
import { readdirSync } from "fs";
import { resolve } from "path";

export default async (app: FastifyInstance) => {
    const filesRoutes = 
        readdirSync(resolve("src", "routes")).filter(file => !/index/g.test(file));

    for (const fileRoute of filesRoutes) {
        const file = await import(resolve(__dirname, fileRoute));

        for (const route of file.default) {
            app.route(route);
        }
    }
}