/** @format */

import dotenv from "dotenv";
import fs from "fs";
import path from "path";
let envPath = path.join(__dirname, "../../.env");
if (!fs.existsSync(envPath)) {
    throw new Error(`Error: .env file is missing`);
}
dotenv.config({ path: envPath });

let config = {
    server: {
        port: Number(process.env.PORT || 3000),
        host: process.env.HOST || "localhost",
        protocol: process.env.PROTOCOL || "http",
        certKey: process.env.CERT_KEY || "",
        certPath: process.env.CERT_PATH || "",
    },
    debug: {
        logConsole: Boolean(process.env.LOGS_CONSOLE == "true" || true),
 
    },
    mongodb: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017",
        dbName: process.env.MONGODB_DB || "unitask",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "unitask",
        expiry: process.env.JWT_EXPIRY || "30m",
    },
};

let objects: any = Object.values(config);
for (let object of objects) {
    for (let key in object) {
        if ([ undefined, null].includes(object[key])) {
            throw new Error(`Error: ${key} is missing in env file`);
        }
    }
}

export { config };
