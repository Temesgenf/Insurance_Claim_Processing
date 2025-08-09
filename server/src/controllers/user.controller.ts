import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import multer from "multer";
import path from "path";
import { NotificationService } from "../services/notification.service";
import { sendPasswordResetEmail, sendVerificationEmail, subscribeToNewsLetter } from "../utils/mailer";
import crypto from "crypto";
// Add this interface to properly type the request with file
interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

const API_BASE_URL = env.API_BASE_URL;

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
     const verificationExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
const generateSixDigitCode = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

// Example usage:
    const verificationCode = generateSixDigitCode();
    
    // Create user
    const newUser = await UserService.createUser({
      fullName,
      age,
      email,
      hashedPassword,
      isVerified:false,
      verificationCode,
      verificationExpiresAt,
    });




 await sendVerificationEmail({
      email: newUser.email,
      name: fullName,
      verificationCode
    });
    
    // Remove password from response
    // const userResponse: Partial<Document> = newUser.toObject();
    // delete userResponse.password;

   

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const updateProfilePicture = async (req: RequestWithFile, res: Response) => {
  try {
    const userInfo = req.user;
    const userId = userInfo?.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Check file type
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        message: "Invalid file type. Only JPEG, PNG, and GIF are allowed." 
      });
    }

    // Upload to Cloudinary and update user
    const { profilePictureUrl } = await UserService.updateProfilePicture(
      userId, 
      file.buffer
    );

    // Send notification
    NotificationService.emitToUser(userId, {
      type: "user_profile",
      message: "Profile picture updated successfully",
      data: {
        profilePictureUrl
      }
    });

    return res.status(200).json({
      message: "Profile picture uploaded successfully",
      profilePictureUrl
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : "Failed to upload profile picture" 
    });
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

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const {email, verificationCode} = req.body;
    

    if(!email || !verificationCode){
      return res.status(400).json({message: "Email and verification code are required"})
    }

    const user = await UserService.findUserByEmail(email);
    

    if(!user){
      return res.status(404).json({message: "User not found"})
    }

    if(user.verificationCode !== verificationCode){
      return res.status(400).json({message: "Invalid verification code"})
    }

    if(user.verificationExpiresAt < new Date()){
      return res.status(400).json({message: "Verification code has expired"})
    }

    await UserService.updateUser(user.userId, {
      isVerified: true,
      verificationCode: "",
      verificationExpiresAt: new Date(),
    })

    return res.status(200).json({message: "Email verified successfully"})

  } catch (error: any) {
    console.error("Error verifying email:", error);
    // res.status(500).json({ message: "Email verification failed", error: error.message });   
    return res.status(500).json({ message: "Email verification failed", error: error.message });

  }
};

export const resendVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserService.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Generate a new 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Set code expiry (e.g., 10 minutes from now)
    const verificationExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Update user with new code and expiry
    await UserService.updateUser(user.userId, {
      verificationCode,
      verificationExpiresAt,
    });

    // Send the code via email (assume UserService.sendVerificationEmail exists)
    await sendVerificationEmail({email:user.email, name:user.fullName , verificationCode});

    return res.status(200).json({ message: "Verification code resent successfully" });
  } catch (error: any) {
    console.error("Error resending verification code:", error);
    return res.status(500).json({ message: "Failed to resend verification code", error: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try{
    const {email} = req.body;
    
    if(!email){
      return res.status(400).json({message: "Email is required"})
    }

    const user = await UserService.findUserByEmail(email);
    if(!user){
      return res.status(200).json({message: "If an account exists, a password reset link has been sent."})
    }
   ;

    const token = jwt.sign({
      userId: user.userId,
    }, env.JWT_RESET_PASSWORD_SECRET, {expiresIn: "1h"},
  );
  const resetPasswordLink = `${API_BASE_URL}/resetPassword?token=${token}`;

  await sendPasswordResetEmail({
    email: user.email,
    name: user.fullName,
    resetLink: resetPasswordLink,
  });

  return res.status(200).json({message: "Password reset link sent successfully"})
  }
  catch(error: any){
    console.error("Error sending password reset email:", error);
    return res.status(500).json({message: "Failed to send password reset email", error: error.message})
  }

}

export const resetPassword = async (req: Request, res: Response) => {
  try{
    const {token, Password} = req.body;
    if(!token || !Password){
      return res.status(400).json({message: "Token and new password are required"})
    }
    const decoded = jwt.verify(token, env.JWT_RESET_PASSWORD_SECRET) as { userId: number };
    const userId = decoded.userId;
    const user = await UserService.findUserById(userId);
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    await UserService.updateUser(userId, {hashedPassword});
    return res.status(200).json({message:"password has been reset succesfully"})
  }
  catch (error:any){
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
}

// Newsletter subscription controller
export const subscribeToNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Send newsletter subscription email
    await subscribeToNewsLetter({ email });

    res.status(200).json({ 
      message: "Successfully subscribed to newsletter! Check your email for confirmation.",
      success: true 
    });
  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({ 
      message: "Failed to subscribe to newsletter. Please try again later.",
      error: error.message,
      success: false 
    });
  }
};