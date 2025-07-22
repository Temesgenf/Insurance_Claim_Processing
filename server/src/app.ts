
import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./utils/env";

const app = express();
const API_BASE_URL = env.API_BASE_URL;

app.use(cors({ origin: API_BASE_URL, credentials: true }));
app.use(express.json());

registerRoutes(app);
app.use(errorHandler);

export default app;
