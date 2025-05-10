import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { registerRoutes } from "./routes";
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

registerRoutes(app);
app.use(errorHandler);

export default app;
