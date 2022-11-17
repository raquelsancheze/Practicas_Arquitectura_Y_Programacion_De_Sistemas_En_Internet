import {User, Book, Author} from "../types.ts";
import {ObjectId} from "mongo";

export type UserSchema = User & { _id: ObjectId };
export type AuthorSchema = Author & { _id: ObjectId };
export type BookSchema = Book & { _id: ObjectId };