import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Provider } from "../entities/Provider";
import { Policy } from "../entities/Policy";
import { Claim } from "../entities/Claim";
import { ClaimDocument } from "../entities/Claim-Document";
import { Product } from "../entities/Product";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Product, Provider, Policy, Claim, ClaimDocument],
  migrations: [],
  subscribers: [],
});
