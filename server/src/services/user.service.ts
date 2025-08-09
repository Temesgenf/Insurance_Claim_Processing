import { userRepository } from "../repositories/user.repository";
import { User } from "../entities/User";
import { cloudinaryService } from "./cloudinary.service";

export const UserService = {
  createUser: async (userData: Partial<User>): Promise<User> => {
    return await userRepository.createUser(userData);
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    return await userRepository.findUserByEmail(email);
  },
  getAllUsers: async (): Promise<User[]> => {
    return await userRepository.getAllUsers();
  },
  deleteUser: async (userId: number) => {
    return await userRepository.deleteUser(userId);
  },
  findUserById: async (userId: number): Promise<User | null> => {
    return await userRepository.findUserById(userId);
  },
  updateUser: async (userId: number, userData: Partial<User>) => {
    return await userRepository.updateUser(userId, userData);
  },

  updateProfilePicture: async (userId: number, fileBuffer: Buffer): Promise<{ profilePictureUrl: string }> => {
    try {
      // Upload to Cloudinary
      const { url } = await cloudinaryService.uploadProfilePicture(fileBuffer, userId);
      
      // Update user with the new Cloudinary URL
      await userRepository.updateUser(userId, { 
        profilePictureUrl: url 
      });
      
      return { profilePictureUrl: url };
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw new Error('Failed to update profile picture');
    }
  },

  verifyUser: async (userId: string) => {
  return await userRepository.findByIdAndUpdateVerification(
    userId, {isVerified : true}
  ); // Exclude password from the returned user
  }
};
