import {Users} from "../types.ts";
import {Transactions} from "../types.ts";
import {ObjectId} from "mongo";

export type UsersSchema = Users & {_id: ObjectId};
export type TransactionsSchema = Transactions & {_id: ObjectId};