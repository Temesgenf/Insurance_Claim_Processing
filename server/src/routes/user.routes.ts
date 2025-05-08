import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
