import { Request, Response } from "express";
import { userService } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error getting all users:", error);
    res
      .status(500)
      .json({ message: "Failed to get all users", error: error.message });
  }
};

export async function createUser(req: Request, res: Response) {
  try {
    const user = await userService.createUser(req.body);
    // console.log("users in controller", user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
}

export const registerUser = async (req: Request, res: Response) => {
  console.log("req.body in controller before try catch", req.body);
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      confirmPassword,
    } = req.body;

    // Validation checks
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${firstName} ${lastName}`;
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    // Create user
    const newUser = await userService.createUser({
      fullName,
      age,
      email,
      hashedPassword,
    });

    // Remove password from response
    // const userResponse: Partial<Document> = newUser.toObject();
    // delete userResponse.password;

    console.log("newUser in registerUser controller", newUser);

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("req.body in controller before try catch", req.body);
    // Find the user by email
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.userId }, env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};
