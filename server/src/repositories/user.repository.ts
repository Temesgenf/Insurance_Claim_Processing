// import { AppDataSource } from "../config/data-source";
// import { User } from "../entities/User";

// export class UserRepository {
//   static findAll() {
//     return AppDataSource.getRepository(User).find();
//   }

//   static create(user: User) {
//     console.log("user", user);
//     return AppDataSource.getRepository(User).save(user);
//   }
// }

// import { AppDataSource } from "../config/data-source";
// import { User } from "../entities/User";

// export const userRepository = {
//   createUser: async (userData: Partial<User>): Promise<User> => {
//     const user = AppDataSource.getRepository(User).create(userData);
//     return await AppDataSource.getRepository(User).save(user);
//   },

//   findUserByEmail: async (email: string): Promise<User | null> => {
//     return await AppDataSource.getRepository(User).findOne({
//       where: { email },
//     });
//   },
//   getAllUsers: async (): Promise\<User\[]> => { return await AppDataSource.getRepository(User).find(); },

// };
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export const userRepository = {
  createUser: async (userData: Partial<User>): Promise<User> => {
    const user = AppDataSource.getRepository(User).create(userData);
    return await AppDataSource.getRepository(User).save(user);
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    return await AppDataSource.getRepository(User).findOne({
      where: { email },
    });
  },
  getAllUsers: async (): Promise<User[]> => {
    return await AppDataSource.getRepository(User).find();
  },
  deleteUser: async (userId: number) => {
    return await AppDataSource.getRepository(User).delete(userId);
  },
  findUserById: async (userId: number): Promise<User | null> => {
    return await AppDataSource.getRepository(User).findOne({
      where: { userId },
    });
  },
  updateUser: async (userId: number, userData: Partial<User>): Promise<User | null> => {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { userId } });
    if (!user) return null;
    
    const updatedUser = repo.merge(user, userData);
    return await repo.save(updatedUser);
  },
};
