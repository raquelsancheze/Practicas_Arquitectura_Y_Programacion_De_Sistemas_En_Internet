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
type GetAllUsers = RouterContext<
  "/allUsers",
  Record<string | number, string | undefined>,
  Record<string, any>
>;
export const allUsers = async (context: GetAllUsers) => {
    try {
        const userss = await UsersCollection.find({}).toArray();
        context.response.body = userss.map((user) => {
            return {
                _id: user._id.toString(),
                nombre: user.nombre,
                apellidos: user.apellidos,
                DNI: user.DNI,
                telefono: user.telefono,
                email: user.email,
                IBAN:user.IBAN,
            };
        });
    } catch (e) {
        console.error(e);
        console.log("Error en el programa");
    }
}


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
        else {
            arg = {_id: new ObjectId(context.params?.parametro)};
        }
        const correct: boolean = new RegExp("ES[0-9]{22}").test(context.params?.parametro);
        if (correct) {
            arg = { IBAN: context.params?.param }
        }
        const user = await UsersCollection.find(arg).toArray();
        if(user){
            context.response.body = user;
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
