import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";

export type Book = {
    title: string;
    author: ObjectId;
    pages: number;
    ISBN: string;

};
export type User = {
    name: string;
    email: string;
    password: string;
    createdAt: string;
    cart: Book[];
};
export type Author = {
    name: string;
    books: ObjectId[];
}