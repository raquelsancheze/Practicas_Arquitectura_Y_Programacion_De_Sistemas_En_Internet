import {RouterContext} from "oak/router.ts";
import {UsersCollection} from "../src/db/database.ts";
import {ObjectId} from "mongo";


type GetUsersContext = RouterContext<
    "/getUser/:parametro",
    {
        parametro: string; 
    }
    & Record<string | number, string | undefined>, 
    Record<string, any>
>;

export const getUser = async(context: GetUsersContext) => {
    try{
        let arg = {};
        if (new RegExp("^[0-9]{8,8}[A-Za-z]$").test(context.params?.parametro)){
            arg = {DNI: context.params?.parametro};
        }
        else if (new RegExp("[0-9]{9}").test(context.params?.parametro)) {
            arg = {telefono: context.params?.parametro};
        }
        else if (new RegExp("^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$").test(context.params?.parametro)) {
            arg = {email: context.params?.parametro};
        }
        else if (new RegExp("([a-zA-Z]{2})\s\t(\d{2})\s\t(\d{4})\s\t(\d{4})\s\t(\d{2})\s\t(\d{10})").test(context.params?.parametro)) {
            arg = {IBAN: context.params?.parametro};
        }
        else {
            arg = {_id: new ObjectId(context.params?.parametro)};
        }
        const usuario = await UsersCollection.findOne(arg);
        if(usuario){
            context.response.body = usuario;
        }
        else{
            context.response.status = 404;
            context.response.body = {
                message: "No available user",
            };
        }
    }
    catch(e){
        console.error(e);
        context.response.status = 500;
    }
} 
