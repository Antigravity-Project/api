import "dotenv/config";
import "reflect-metadata";
import { hostname } from "os";

import { application } from "./app";

const port = process.env.PORT || 3333;

const init = async () => {
    const app = await application();

    const address = await app.listen(
        port,
        process.env.NODE_ENV === "production" ? hostname() : "localhost",
        );

    console.log(address);
}

init();