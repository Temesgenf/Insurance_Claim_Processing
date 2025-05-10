import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class UserRepository {
  static findAll() {
    return AppDataSource.getRepository(User).find();
  }

  static create(user: User) {
    return AppDataSource.getRepository(User).save(user);
  }
}
