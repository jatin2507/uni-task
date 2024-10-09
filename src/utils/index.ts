import { JoiError } from "../interfaces/common.interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./config";
import logger from "../loaders/logger.loader";
import axios, { AxiosResponse, AxiosError, Method } from "axios";

export const JoiParseError = (error: JoiError): string => {
    return error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, "");
};

export const encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export const createJwtToken = (payload: any): string => {
    const secretKey = config.jwt.secret;
    const expiresIn = config.jwt.expiry;
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
};
export const decodeJwtToken = (token: string): any => {
    const secretKey = config.jwt.secret;
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        logger.error("Error decoding JWT token:" + error);
        return null;
    }
};

export const createUniqueToken = async (): Promise<string> => {
    const characters =
        "!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+0123456789!@#$%^&*()_+";
    let token = "";
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
};
export const callApi = async (
    url: string,
    method: Method,
    payload?: any
): Promise<any> => {
    try {
        const response: AxiosResponse = await axios({
            url,
            method,
            data: payload,
        });
        return response.data;
    } catch (error:any) {
        if (error.response) {
            logger.error(
                "Request failed with status code",
                error.response.status
            );
            logger.error("Response data:", error.response.data);
        } else if (error.request) {
            logger.error("No response received:", error.request);
        } else {
            logger.error("Error:", error.message);
        }
        throw error;
    }
};
