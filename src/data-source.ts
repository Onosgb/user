import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { environment } from "../environment";
export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  username: environment.username,
  password: environment.password,
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
