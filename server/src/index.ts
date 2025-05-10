import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import { registerRoutes } from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

registerRoutes(app);

const PORT = parseInt(process.env.PORT || "3000", 10);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
