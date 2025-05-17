import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";
import logger from "../utils/logger.js";

if (!DB_URI) {
  throw new Error(
    "Please define the MONGOOSE_URI environment variable inside .env.<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    logger.info(`Connected to the database successfully in ${NODE_ENV} mode`);
  } catch (error) {
    logger.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
