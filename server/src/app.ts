import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { registerRoutes } from "./routes";
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

registerRoutes(app);
app.use(errorHandler);

export default app;
