import { DataSource } from "typeorm";
import { DATABASE_URL } from "./constants";

export const appDataSource = new DataSource({
  type: "postgres",
  url: DATABASE_URL,
  synchronize: true,
  entities: ["src/entity/*.ts"],
  ssl: false,
});
