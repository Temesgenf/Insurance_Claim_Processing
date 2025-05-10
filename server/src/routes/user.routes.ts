// import { Router } from "express";
// import { createUser, getAllUsers } from "../controllers/user.controller";

// export const userRouter = Router();

// userRouter.get("/", getAllUsers);
// userRouter.post("/", createUser);

import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/usersall", getAllUsers);

export default userRouter;
