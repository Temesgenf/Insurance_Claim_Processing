import * as dotenv from "dotenv";
dotenv.config();

export const env = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "3306",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "",
  DB_NAME: process.env.DB_NAME || "insurance_claim_processing",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  JWT_VERIFICATION_SECRET: process.env.JWT_VERIFICATION_SECRET || "",
  JWT_RESET_PASSWORD_SECRET: process.env.JWT_RESET_PASSWORD_SECRET || "your_jwt_reset_password_secret",
  NODE_ENV: process.env.NODE_ENV || "development",
  BREVO_USER: process.env.BREVO_USER || "",
  BREVO_PASSWORD: process.env.BREVO_PASSWORD || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "",
  BREVO_API_KEY: process.env.BREVO_API_KEY || "",
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:5173",
};
