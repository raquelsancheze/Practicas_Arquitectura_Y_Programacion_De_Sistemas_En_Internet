import {ObjectId} from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import {RouterContext} from "oak/router.ts";
import {UserCollection,AuthorCollection} from "../db/database.ts";

type DeleteUserContext = RouterContext<"/deleteUser/:id", {
    id: string;
} & Record<string | number, string | undefined>, Record<string, any>
    >;

type DeleteAuthorContext = RouterContext<"/deleteAuthor/:id", {
    id: string;
} & Record<string | number, string | undefined>, Record<string, any>>


export const deleteUser = async (context: DeleteUserContext) => {
    try {
         if (context.params?.id) {
            const count = await UserCollection.deleteOne({_id: new ObjectId(context.params.id),});
            if (count) {
                context.response.status = 200;
                context.response.body = {
                    message:"Deleted",
                }
            } else {
                context.response.status = 404;
                context.response.body = {
                    message: "User not found",
                }
            }
     }
    } catch (e) {
        console.error(e);
        context.response.status = 500;
    }
}

export const deleteAuthor = async (context: DeleteAuthorContext) => {
        try {
            if (context.params?.id) {
               const resp = await AuthorCollection.deleteOne({ _id: new ObjectId(context.params.id) })
    
            if (resp < 1) {
                context.response.status = 404
                context.response.body = { message: "Author not found" }
                return
            }
    
            context.response.body = { message: "Deleted" }
            } else {
                context.response.status = 400
                context.response.body = { message: "Bad Request" }
                return
            }
            
        } catch (error) {
            console.error(error)
        }
        
}