import { User } from "../entities/User";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  static async getAllUsers() {
    return UserRepository.findAll();
  }

  static async createUser(user: User) {
    return UserRepository.create(user);
  }
}
