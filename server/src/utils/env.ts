import * as dotenv from "dotenv";
dotenv.config();

export const env = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "3306",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "insurance_claim_processing",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  NODE_ENV: process.env.NODE_ENV || "development",
};
