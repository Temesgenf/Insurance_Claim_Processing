import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import multer from "multer";
import path from "path";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
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
    const user = await UserService.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
}

export const registerUser = async (req: Request, res: Response) => {
  console.log("req.body in controller before try catch", req.body);
  try {
    const { firstName, lastName, dateOfBirth, email, password } = req.body;

    // Validation checks
    if (!firstName || !lastName || !dateOfBirth || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }

    // Check if user already exists
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${firstName} ${lastName}`;
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    // Create user
    const newUser = await UserService.createUser({
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

export const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    // console.log(req);

    const userInfo = req.user;
    console.log(userInfo);
    const userId = userInfo?.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // const userId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await UserService.findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user with profile picture data
    await UserService.updateUser(userId, {
      profilePicture: file.buffer,
      profilePictureType: file.mimetype,
    });

    return res.status(200).json({
      message: "Profile picture uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return res
      .status(500)
      .json({ message: "Failed to upload profile picture" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    await UserService.deleteUser(userId);
    res.status(204).send();
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, remember } = req.body;
    console.log("req.body in controller before try catch", req.body);
    // Find the user by email
    const user = await UserService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.userId,
        isAdmin: user.isAdmin,
      },
      env.JWT_SECRET,
      { expiresIn: remember ? "7d" : "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({
      message: "Login successful",
      token,
      isAdmin: user.isAdmin,
      user,
    });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};
