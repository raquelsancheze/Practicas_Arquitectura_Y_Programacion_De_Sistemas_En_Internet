import {MongoClient} from "mongo";
import {config} from "dotenv";
import {BookSchema, UserSchema, AuthorSchema} from "./schemas.ts";

const env = config();

if(!env.MONGO_USER || !env.MONGO_PWD){
    console.error("You need to define MONGO_USER and MONGO_PWD env variables");
    throw Error("You need to define MONGO_USER and MONGO_PWD env variables");
}

const client = new MongoClient();
await client.connect(
    `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PWD}@cluster0.gmcy3og.mongodb.net/bookstore1?authMechanism=SCRAM-SHA-1`,
);

const db = client.database("bookstore1");
console.info("MongoDB connected");

export const UserCollection = db.collection<UserSchema>("User");
export const BookCollection = db.collection<BookSchema>("Books");
export const AuthorCollection = db.collection<AuthorSchema>("Authors");