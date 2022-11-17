import {RouterContext} from "oak/router.ts";
import {BookCollection, UserCollection, AuthorCollection} from "../db/database.ts";
import {ObjectId} from "mongo"
import {getQuery} from "oak/helpers.ts";

type GetBooksContext = RouterContext<"/getBooks", Record<string | number, string | undefined>, Record<string, any>>

type GetAllBooksContext = RouterContext<"/getAllBooks", Record<string | number, string | undefined>, Record<string, any>>

type GetAuthorContext = RouterContext<"/getAuthor/:id", {
    id: string;
} & Record<string | number, string | undefined>, Record<string, any>
    >;

type GetAllAuthorContext = RouterContext<"/getAllAuthors",  & Record<string | number, string | undefined>, Record<string, any>
    >;

type GetBookContext = RouterContext<"/getBook/:id", {
    id: string;
} & Record<string | number, string | undefined>, Record<string, any>
    >;

type GetAllUsers = RouterContext<"/getAllUsers",
  Record<string | number, string | undefined>,
  Record<string, any>
    >;

export const getBooks = async (context: GetBooksContext) => {
    try {
        const params = getQuery(context, { mergeParams: true });
        if (!params?.page){
            context.response.status = 400
            context.response.body = {
                message: "You have to specify the pages"
            }
            return;
        }
        let query = {}
        if(params?.title){
            query = {
                title: params.title
            }
        }
        const books = await BookCollection.find(query).skip(Number(params.page)*10).limit(10);
        context.response.body = books;
    } catch (e) {
        console.error(e);
        context.response.status = 500;
    }
}

export const getAllBooks = async (context: GetAllBooksContext) => {
    try {
        const books = await BookCollection.find({}).toArray();
        context.response.body = books.map((mybook) => ({
            title: mybook.title,
            author: mybook.author,
            pages: mybook.pages,
            ISBN: mybook.ISBN,
            id: mybook._id,
         }));
        context.response.status = 200;
    } catch (e) {
        console.error(e);
        context.response.status = 500;
    }
}

export const getAuthor = async (context: GetAuthorContext) => {
    try {
        if (context.params?.id) {
            const author = await AuthorCollection.findOne({ _id: new ObjectId(context.params.id) });
            if (author) {
                context.response.status = 200;
                context.response.body = {
                    name: author.name,
                    books: author.books,
                }
            } else {
                context.response.status = 404;
                context.response.body = {
                    message: "Author not found",
                }
            }
        }
    } catch (e) {
        console.error(e);
        context.response.status = 500;
    }
}

export const getAllAuthors = async (context: GetAllAuthorContext) => {
    try {
        const authors = await AuthorCollection.find({}).toArray();
        context.response.body = authors.map((myauthors) => ({
            name: myauthors.name,
            books: myauthors.books,
            id: myauthors._id,
         }));
        context.response.status = 200;
    } catch (e) {
        console.error(e);
        context.response.status = 500;
    }
}

export const getBook = async (context: GetBookContext) => {
    try {
        if (context.params?.id) {
            const book = await BookCollection.findOne({ _id: new ObjectId(context.params.id) });
            if (book) {
                context.response.status = 200;
                context.response.body = {
                    title: book.title,
                    author: book.author,
                    pages: book.pages,
                    ISBN: book.ISBN,
                }
            } else {
                context.response.status = 404;
                context.response.body = {
                    message: "Book not found",
                }
            }
        }
    } catch (e) {
        console.error(e);
        context.response.status = 500;
    }
}

export const getAllUsers = async (context: GetAllUsers) => {
    try {
        const users = await UserCollection.find({}).toArray();
        context.response.body = users.map((user) => ({
            name: user.name,
            email: user.email,
            id: user._id,
            cart: user.cart,
         }));
        context.response.status = 200;
    } catch (e) {
        console.error(e);
        context.response.status = 500;
    }
}