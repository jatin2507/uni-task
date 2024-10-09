/** @format */

import { login } from "../controllers/user.controller";
import logger from "../loaders/logger.loader";
import { decodeJwtToken } from "../utils";
import { collection } from "../utils/const";
import { findOne } from "../utils/db";
import { failed } from "../utils/response.utils";

export const jwtToken = async (req: any, res: any, next: any) => {
    try {
        let token = req.headers["authorization"];
        if (!token) {
            return res.status(403).send(failed({}, "Token is required", 400));
        }
        token = token.split(" ")[1];
        let decoded = await decodeJwtToken(token);
        if (!decoded)
            return res.status(403).send(failed({}, "Invalid token", 400));
        let user = await findOne({
            collection: collection.users,
            query: { _id: decoded._id, loginToken: decoded.token },
        });
        if (!user)
            return res.status(403).send(failed({}, "Invalid token", 400));
        req.user = decoded;
        next();
    } catch (error) {
        logger.error("!! Middleware !! Auth Code Failed !!");
        logger.error(error);
        return res.status(403).send(failed(error, "", 400));
    }
};
