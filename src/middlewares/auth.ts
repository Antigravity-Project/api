import { FastifyReply, FastifyRequest } from "fastify";

import { HttpStatusCode } from "../enums/http-status";
export const authentication = async (req: FastifyRequest, res: FastifyReply) => {
    if (!req.headers["authorization"]) {
        return res
            .status(HttpStatusCode.UNAUTHORIZED)
            .send({
                message: "Unauthorized."
            });
    }

    if (
        typeof req.headers["authorization"] !== "string"
        || !/Bearer/i.test(req.headers["authorization"])
    ) {
        return res
            .status(HttpStatusCode.UNAUTHORIZED)
            .send({
                message: "Token not formatted."
            });
    }

    const token = req.headers["authorization"].split(" ")[1];

    if (token !== process.env.SECRET_KEY) {
        return res
                .status(HttpStatusCode.UNAUTHORIZED)
                .send({
                    message: "Invalid token."
                });
    }
}