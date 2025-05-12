import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import { UserService } from "../services/user.service";
import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get token from Authorization header only
  console.log("Verifying token...");
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", req.headers.authorization);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: number };
    const user = await UserService.findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Session expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "Authentication failed" });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admin privileges required" });
  }
  next();
};
