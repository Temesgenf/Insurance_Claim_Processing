import express from "express";
import { registerRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

registerRoutes(app);
app.use(errorHandler);

export default app;
