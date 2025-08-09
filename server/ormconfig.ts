import { DataSource } from "typeorm";
import { User } from "./src/entities/User";
import { Provider } from "./src/entities/Provider";
import { Policy } from "./src/entities/Policy";
import { Claim } from "./src/entities/Claim";
import { ClaimDocument } from "./src/entities/Claim-Document";
import { Product } from "./src/entities/Product";
import { env } from "./src/utils/env";

export default new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT, 10),
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Provider, Policy, Claim, ClaimDocument, Product],
  migrations: ["./src/migrations/*.ts"],
  subscribers: [],
});
