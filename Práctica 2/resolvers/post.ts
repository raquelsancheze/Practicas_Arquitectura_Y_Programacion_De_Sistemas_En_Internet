import {RouterContext} from "oak/router.ts";
import {TransactionsCollection, UsersCollection} from "../src/db/database.ts";
import {TransactionsSchema, UsersSchema} from "../src/db/schemas.ts";
import {ObjectId} from "mongo";
import { fromFileUrl } from "https://deno.land/std@0.152.0/path/win32.ts";
import { serializeWithBufferAndIndex } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import { Users } from "../src/types.ts";

type AddUserContext = RouterContext<
    "/addUser", 
    {
        value: string;
    } &
    Record<string | number, string | undefined>,
    Record<string, any>
>;

type AddTransactionContext = RouterContext<
    "/addTransaction", 
    {
        value: string;
    } &
    Record<string | number, string | undefined>,
    Record<string, any>
>;

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const addUser = async(context: AddUserContext) => {
    try{
        let IBANaleatorio: string = "ES";
        let i: number;
        for(i = 0; i < 22; i++){
            const numero: string = getRandomInt(10).toString();
            IBANaleatorio = IBANaleatorio.concat(numero);
        } 
        const body = context.request.body({type: "json"});
        const value = await body.value;
        if(!value?.email || !value?.nombre || !value?.apellidos || !value?.telefono || !value?.DNI){
            context.response.body = 400;
            context.response.body = {
                message: "You need to specify email, name, surname and telephone number",
            }
            return;
        }
        const correct: boolean = new RegExp("^[0-9]{8,8}[A-Za-z]$").test(value.DNI) && 
            new RegExp("[0-9]{9}").test(value.telefono) && 
            new RegExp("^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$").test(value.email) && 
            new RegExp("^[0-9]{8,8}[A-Za-z]$").test(value.DNI);
        if(correct){
            const found = await UsersCollection.findOne({
                telefono: value.telefono,
                email: value.email,
                DNI: value.DNI,
            });
            if(found){
                context.response.status = 400;
                context.response.body = {
                    message: "User already in DB",
                };
                return;
            }
            await UsersCollection.insertOne({
                //value as UsersSchema,
                //user as UsersSchema
                ...value,
                IBAN: IBANaleatorio
        });
            context.response.body = {
                ...value,
                IBAN: IBANaleatorio
            }
        }
        else{
            context.response.status = 400;
            context.response.body = {
                message: "Bad format on DNI, telephone or email",
            }
        }
    }
    catch(e){
        console.error(e);
        context.response.status = 500;
    }
}

export const addTransaction = async(context: AddTransactionContext) => {
    try{
        const body = context.request.body({type: "json"});
        const value = await body.value;
        if(!value?.ID_Sender  || !value?.ID_Receiver || !value?.amount){
            context.response.body = 400;
            context.response.body = {
                message: "You need to specify ID_Sender, ID_Receiver and amount of money",
            }
            return;
        }
        const correcto = await UsersCollection.findOne({
           _id: new ObjectId(value.ID_Sender),
        })
        if(correcto){
            const correcto2 = await UsersCollection.findOne({
                _id: new ObjectId(value.ID_Receiver),
            })
            if(correcto2){
                await TransactionsCollection.insertOne(
                    value as TransactionsSchema,
                );
                context.response.body = value;
            }
            else{
                context.response.status = 400;
                context.response.body = {
                    message: "There is no user with the ID of the receiver",
                }
                return;
            }
        }
        else{
            context.response.status = 400;
            context.response.body = {
                message: "There is no user with the ID of the sender",
            }
            return;
        }
    }
    catch(e){
        console.error(e);
        context.response.status = 500;
    }
}