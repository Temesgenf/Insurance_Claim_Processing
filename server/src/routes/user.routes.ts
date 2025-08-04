// import { Router } from "express";
// import { createUser, getAllUsers } from "../controllers/user.controller";

// export const userRouter = Router();

// userRouter.get("/", getAllUsers);
// userRouter.post("/", createUser);

import express from "express";
import {
  deleteUser,
  forgotPassword,
  resendVerification,
  resetPassword,
  subscribeToNewsletter,
  updateProfilePicture,
  verifyEmail,
} from "../controllers/user.controller";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/user.controller";
import {
  verifyToken,
  updateProfilePictureMiddleware,
} from "../middleware/auth.middleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/usersall", getAllUsers);
userRouter.delete("/:id", deleteUser);
userRouter.post(
  "/profile-picture",
  verifyToken,
  updateProfilePictureMiddleware,
  updateProfilePicture
);

userRouter.post("/verifyEmail", verifyEmail);
userRouter.post("/resend-verification", resendVerification);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/subscribe-newsletter', subscribeToNewsletter);

export default userRouter;
