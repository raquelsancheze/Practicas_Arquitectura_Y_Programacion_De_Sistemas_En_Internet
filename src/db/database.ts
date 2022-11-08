import {MongoClient} from "mongo";
import {config} from "dotenv";
import {UsersSchema} from "./schemas.ts";
import {TransactionsSchema} from "./schemas.ts";

const env = config();

if(!env.MONGO_USER || !env.MONGO_PWD){
    console.error("You need to define MONGO_USER and MONGO_PWD env variables");
    throw Error("You need to define MONGO_USER and MONGO_PWD env variables");
}

const client = new MongoClient();
await client.connect(
    `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PWD}@cluster0.oiqo4q4.mongodb.net/bank?authMechanism=SCRAM-SHA-1`
);
const db = client.database("bank");
console.info("MongoDB connected");

export const UsersCollection = db.collection<UsersSchema>("Users");
export const TransactionsCollection = db.collection<TransactionsSchema>("Transactions");