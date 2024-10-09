/** @format */

import { Schema } from "joi";

import logger from "../loaders/logger.loader";
import { JoiParseError } from "../utils";
import { failed, validation } from "../utils/response.utils";

export const validationMiddleware = (type: string, schema: Schema) => (
    req: any,
    res: any,
    next: any
) => {
    if (!schema || !schema.validate) {
        return res.status(500).send(failed({}, "Invalid schema", 500));
    }
    logger.info(`validation payload of ${type}: `);
    logger.info(req[type]);

    const { error } = schema.validate(req[type]);
    if (error) return res.status(403).send(validation(JoiParseError(error)));
    next();
};
