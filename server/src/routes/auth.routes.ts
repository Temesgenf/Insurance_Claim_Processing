// Backend route
import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { UserService } from "../services/user.service";

const authRouter = express.Router();

authRouter.get("/verify", verifyToken, (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "Token is valid", user: req.user });
  } else {
    res.status(401).json({ message: "Token is invalid" });
  }
});

export default authRouter;
