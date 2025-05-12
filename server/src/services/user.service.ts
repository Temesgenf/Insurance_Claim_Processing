import { userRepository } from "../repositories/user.repository";
import { User } from "../entities/User";

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
};
