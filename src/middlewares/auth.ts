import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { verify } from "jsonwebtoken";

import { secret } from "../config/auth.json";
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

    const token = req.headers["authorization"].split(" ")[0];

    verify(token, secret, (err) => {
        if (err) {
            return res
                .status(HttpStatusCode.UNAUTHORIZED)
                .send({
                    message: "Invalid token."
                });
        }
    });
}