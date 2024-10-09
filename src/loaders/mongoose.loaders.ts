import mongoose from "mongoose";
import { config } from "../utils/config";
import logger from "./logger.loader";

const connectToMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(
            `${config.mongodb.uri}/${config.mongodb.dbName}`
        );
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error("Failed to connect to MongoDB:", error);
    }
};

export { connectToMongoDB };
