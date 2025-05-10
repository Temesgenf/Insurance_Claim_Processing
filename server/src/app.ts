// import express from "express";
// import { registerRoutes } from "./routes";

// const app = express();
// app.use(express.json());

// export default app;

// import express from "express";
// import UserRoutes from "./routes/user.routes";
// import cors from "cors";
// import { errorHandler } from "./middleware/errorHandler";
// import { registerRoutes } from "./routes";

// const app = express();

// app.use(express.json());
// registerRoutes(app);
// app.use(errorHandler);
// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Allow cookies/sessions
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));

// export default app;
import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { registerRoutes } from "./routes";
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's URL (change port if needed)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods

    credentials: true, // Allow cookies/sessions if needed
  })
);
app.use(express.json());

registerRoutes(app);
app.use(errorHandler);

export default app;
