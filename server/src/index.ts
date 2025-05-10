import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import { registerRoutes } from "./routes";

const app = express();
app.use(express.json());

registerRoutes(app);

const PORT = parseInt(process.env.PORT || "3000", 10);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
