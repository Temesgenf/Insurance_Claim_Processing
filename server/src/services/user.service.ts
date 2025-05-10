// import { User } from "../entities/User";
// import { UserRepository } from "../repositories/user.repository";

// export class UserService {
//   static async getAllUsers() {
//     return UserRepository.findAll();
//   }

//   static async createUser(user: User) {
//     return UserRepository.create(user);
//   }
// }

import { userRepository } from "../repositories/user.repository";
import { User } from "../entities/User";

export const userService = {
  createUser: async (userData: Partial<User>): Promise<User> => {
    return await userRepository.createUser(userData);
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    return await userRepository.findUserByEmail(email);
  },
  getAllUsers: async (): Promise<User[]> => {
    return await userRepository.getAllUsers();
  },
};
