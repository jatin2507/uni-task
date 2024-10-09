import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "../utils/config";

const logFormat = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.printf((info: any) => {
        return `${info.timestamp} ${
            info.level == "error"
                ? `[You Got ${info.level}] `
                : "[" + info.level + "] "
        }: ${
            typeof info.message === "object"
                ? JSON.stringify(info.message)
                : info.message
        }`;
    })
);

const transport: any[] = [];

if (config.debug.logConsole) {
    transport.push(new winston.transports.Console({ level: "info" }));
}

const logger = winston.createLogger({
    format: logFormat,
    transports: transport,
    exceptionHandlers: [
        new winston.transports.File({
            filename: "logs/uncaughtExceptions.log",
        }),
    ],
});

export default logger;
