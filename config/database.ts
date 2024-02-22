import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/Order.entity";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root@123",
    database: "my_sql",
    entities: [User],
    logging: false,
    synchronize: true,
});
