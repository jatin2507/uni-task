/** @format */
import { config } from "./utils/config";

import express, { Request, Response } from "express";
import fs from "fs";
import http from "http";
import https from "https";

const app = express();
const port = config.server.port;
let protocol: string;
let server: http.Server | https.Server;

if (config.server.protocol === "https") {
    const httpsOptions: https.ServerOptions = {
        key: fs.readFileSync(config.server.certKey as string),
        cert: fs.readFileSync(config.server.certPath as string),
    };
    protocol = "https";
    server = https.createServer(httpsOptions, app);
} else {
    protocol = "http";
    server = http.createServer(app);
}

app.get("/health", (req: Request, res: Response) => {
    res.send(success("\nServer is up and running"));
});

import expressLoader from "./loaders/express.loader";

import logger from "./loaders/logger.loader";
import { success } from "./utils/response.utils";
import { connectToMongoDB } from "./loaders/mongoose.loaders";

expressLoader(app);

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

Promise.all([connectToMongoDB()])
    .then(() => {
        server.listen(port, () => {
            logger.info(
                `Server Started on (⌐■_■) ${protocol}://${config.server.host}:${port}`
            );
        });
    })
    .catch((e) => {
        logger.error("Error during server startup:", e);
        process.exit(1);
    });
