import { Application, Router} from "oak";
import {getUser} from "../resolvers/get.ts";
import {addTransaction, addUser} from "../resolvers/post.ts";
import {removeUser} from "../resolvers/delete.ts";

const router = new Router();

router
    .get("/getUser/:parametro", getUser)
    .post("/addUser", addUser)
    .delete("/deleteUser/:email", removeUser)
    .post("/addTransaction", addTransaction);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port: 7777});