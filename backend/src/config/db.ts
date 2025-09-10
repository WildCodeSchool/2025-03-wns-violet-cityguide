import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import User from "../entities/User";
import City from "../entities/City";
import Poi from "../entities/Poi";
import Category from "../entities/Category";
import Notes from "../entities/Note";
import Note from "../entities/Note";
import Comment from "../entities/Comment";

dotenv.config();
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;

const dataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [User, City, Poi, Category, Note, Comment],
    synchronize: true,
    logging: ["error", "query"],
});

export default dataSource;