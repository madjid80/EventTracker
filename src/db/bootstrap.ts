import { environmentConfig } from "@config/index.js";
import { logger } from "@utilities/index.js";
import mongoose from "mongoose";
export const LiFiTransfers = "LiFiTransfers";

// eslint-disable-next-line import/no-mutable-exports
export let dataSource: mongoose.Mongoose;

const connectionOptions = {
  connectTimeoutMS: 7 * 1000,
  maxPoolSize: 20,
  maxConnecting: 20,
  maxIdleTimeMS: 2 * 60 * 60 * 1000,
  readPreference: "nearest",
  retryWrites: true,
  autoIndex: true,
} satisfies mongoose.ConnectOptions;

export const connect = async (
): Promise<mongoose.Mongoose> => {
  const mongoUrl: string | undefined = environmentConfig.MONGO_URL
  if (mongoUrl === undefined) {
    throw new Error("MONGO_URL is not defined in environment variables.");
  }
  dataSource = await mongoose.connect(mongoUrl, connectionOptions);
  if(isConnected()) {
    logger.info(`Connected to MongoDB.`);
  }
  return dataSource;
};

export const close = async (): Promise<void> => {
  if (dataSource !== undefined) {
    logger.info(`Disconnecting database`);
    await dataSource.disconnect();
  }
};

export const getOrFail = () => {
  const db = dataSource.connection.db;
  if (db === undefined)
    throw new Error(
      "Tried to access mongodb but the data source seems to be disconnected."
    );
  return db;
};

export const isConnected = (): boolean => {
  return dataSource?.connection.readyState === 1;
};
