import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { RouterContext } from "oak/router.ts";
import {  AuthorCollection, BookCollection, UserCollection } from "../db/database.ts";
import { AuthorSchema, BookSchema } from "../db/schemas.ts";

type AddUserContext = RouterContext<"/addUser",
    Record<string | number, string | undefined>,
    Record<string, any>
    >;

type AddAuthorContext = RouterContext<"/addAuthor",
    Record<string | number, string | undefined>,
    Record<string, any>
    >;

type AddBookContext = RouterContext<"/addBook",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

export const addUser = async (context: AddUserContext) => {
    try {
        const body = context.request.body({ type: "json" });
        const value = await body.value;
        if (!value.name || !value.email || !value.password) {
            context.response.status = 400;
            context.response.body = {
                message: "You are missing information"
            }
        }
        const correct: boolean =  new RegExp("^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$").test(value.email);
        if (!correct) {
            context.response.status = 400;
            context.response.body = {
                message: "You need to enter the right format of the information"
            }
            return;
        }
        else {
            const encoder = new TextEncoder();
            const hashedPassword = await crypto.subtle.digest("SHA-256", encoder.encode(value.password));
            const hashedPasswordString = Array.from(new Uint8Array(hashedPassword)).map(b => b.toString(16).padStart(2, "0")).join("");
            const found = await UserCollection.findOne({ email: value.email });
            if (found) {
                context.response.status = 400;
                context.response.body = {
                    message: "User is already in DB",
                };
                return;
            }
            const today = new Date().toDateString();
            const myexactdate = today.toString();
            const myuser = {
                name: value.name,
                email: value.email,
                password: hashedPasswordString,
                createdAt: myexactdate,
                cart: [],
            };
            await UserCollection.insertOne(myuser);
            context.response.body = myuser;
            context.response.status = 200;
        }

    } catch (e) {
        console.error(e);
        console.log("Error en el programa");
    }
}

export const addAuthor = async (context: AddAuthorContext) => {
   try {
        const result = context.request.body({ type: "json" });
        const value = await result.value;
        if (!value?.name) {
            context.response.status = 400;
            context.response.body = { message: "Bad Request" }
            return;
        }
        const author: Partial<AuthorSchema> = {
            name: value.name,
            books: [],
        }
        const id = await AuthorCollection.insertOne(author as AuthorSchema);
        context.response.body = { _id: id, ...author }

    } catch (error) {
        console.error(error)
    }
};

export const addBook = async (context: AddBookContext) => {
    try {

        const result = context.request.body({ type: "json" });
        const value = await result.value;
        if (!(value?.title && value?.author && value?.pages)) {
            context.response.status = 400;
            context.response.body = { message: "Bad Request" }
            return;
        }

        const author = await AuthorCollection.findOne({ _id: new ObjectId(value.author) })
        if (!author) {
            context.response.status = 404;
            context.response.body = { message: "Author not found" }; 
            return
        }

        const book : Partial<BookSchema> = {
            title: value.title,
            author: new ObjectId(value.author),
            pages: value.pages,
        }

        if (await BookCollection.findOne(book)){
            context.response.status = 409;
            context.response.body = { message: "Book already exists" }; 
            return
        }

        book.ISBN = crypto.randomUUID()

        const bookId = await BookCollection.insertOne(book as BookSchema);

        await AuthorCollection.updateOne({ _id: author._id}, {
            $set: {
                books: author.books.concat(bookId)
            }
        })

        context.response.body = { _id: bookId, ...book}
        
    } catch (error) {
        console.error(error)
    }
  
};