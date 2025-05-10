import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const user = await UserService.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
}
