import {Application, Router} from "oak";
import {config} from "dotenv"
import {addUser,addAuthor,addBook} from "./resolvers/post.ts"
import {getAllAuthors, getAllBooks, getAllUsers, getAuthor, getBook, getBooks} from "./resolvers/get.ts"
import {deleteAuthor, deleteUser} from "./resolvers/delete.ts"
import {updateCart} from "./resolvers/put.ts"

const router = new Router();

router
    .get("/test", (context) => {
        context.response.body = "Working";
    })   
    .post("/addUser", addUser)
    .post("/addBook", addBook)
    .post("/addAuthor", addAuthor)
    .get("/getBooks", getBooks)
    .get("/getAllBooks", getAllBooks)
    .get("/getAuthor/:id", getAuthor)
    .get("/getAllAuthors", getAllAuthors)
    .get("/getAllUsers", getAllUsers)
    .get("/getBook/:id", getBook)
    .delete("/deleteUser/:id", deleteUser)
    .delete("/deleteAuthor/:id", deleteAuthor)
    .put("/updateCart", updateCart)
        
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.info("Server waiting for request on port 7777");
await app.listen({ port: 7777 });