import {RouterContext} from "oak/router.ts";
import {UsersCollection} from "../src/db/database.ts";

type RemoveUserContext = RouterContext<"/deleteUser/:email",
    {
        email: string;
    } 
    & Record<string | number, string | undefined>, Record<string, any>
>;

export const removeUser = async(context: RemoveUserContext) => {
    try{
        const email = context.params.email;
        const usuario = await UsersCollection.findOne({email});
        if(!usuario){
            context.response.status = 404;
            context.response.body = {
                message: "User not found",
            };
            return;
        }
        await UsersCollection.deleteOne({email});
        context.response.status = 200;
    }
    catch(e){
        console.error(e);
        context.response.status = 500;
    }
}