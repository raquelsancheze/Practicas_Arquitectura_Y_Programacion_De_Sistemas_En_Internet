import { KnownArgumentNamesOnDirectivesRule } from "https://deno.land/x/graphql_deno@v15.0.0/lib/validation/rules/KnownArgumentNamesRule.d.ts";
import {ObjectId} from "mongo";
import {cochesCollection, vendedoresCollection, concesionariosCollection} from "../db/dbconnection.ts";
import { cocheSchema, concesionarioSchema, vendedorSchema } from "../db/schema.ts";
import {coche, vendedor, concesionario} from "../types.ts";

export const Mutation = {
    crearCoche: async(
        _: unknown,
        args: {
            matricula: string,
            marca: string,
            asientos: number,
            precio: number
        }
    ): Promise<cocheSchema> => {
        try{
            const correcto: boolean = new RegExp("^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}").test(args.matricula);
            if(correcto){
                const existe = await cochesCollection.findOne({matricula: args.matricula});
                if(existe){
                    throw new Error("Este coche ya existe");
                }
                const coche = await cochesCollection.insertOne({
                    matricula: args.matricula,
                    marca: args.marca,
                    asientos: args.asientos,
                    precio: args.precio
                });
                return{
                    _id: coche,
                    matricula: args.matricula,
                    marca: args.marca,
                    asientos: args.asientos,
                    precio: args.precio
                }
            }
            else{
                throw new Error("La matrícula no tiene el formato correcto");
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    },
    crearVendedor: async(
        _: unknown,
        args: {
            nombre: string,
            dni: string
        }
    ): Promise<vendedorSchema> => {
        try{
            const correcto: boolean = new RegExp("^[0-9]{8,8}[A-Za-z]$").test(args.dni);
            if(correcto){
                const existe = await vendedoresCollection.findOne({dni: args.dni});
                if(existe){
                    throw new Error("Este vendedor ya existe");
                }
                const coches: ObjectId[] = [];
                const vendedor = await vendedoresCollection.insertOne({
                    nombre: args.nombre,
                    dni: args.dni,
                    coches: []
                });
                return{
                    _id: vendedor,
                    nombre: args.nombre,
                    dni: args.dni,
                    coches: []
                }
            }
            else{
                throw new Error("El formato del DNI no es válido");
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    },
    crearConcesionario: async(
        _: unknown,
        args: {
            nombre: string,
            ciudad: string
        }
    ): Promise<concesionarioSchema> => {
        try{
            const vendedores: ObjectId[] = [];
            const concesionario = await concesionariosCollection.insertOne({
                nombre: args.nombre,
                ciudad: args.ciudad,
                vendedores: []
            });
            return{
                _id: concesionario,
                nombre: args.nombre,
                ciudad: args.ciudad,
                vendedores: []
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    },
    anadirCocheAVendedor: async(
        _: unknown,
        args: {
            idVendedor: string,
            idCoche: string
        }
    ): Promise<vendedorSchema | undefined> => {
        const existeVendedor = await vendedoresCollection.findOne({_id: new ObjectId(args.idVendedor)});
        if(!existeVendedor){
            throw new Error("No existe un vendedor con ese id");
        }
        const existeCoche = await cochesCollection.findOne({_id: new ObjectId(args.idCoche)});
        if(!existeCoche){
            throw new Error("No existe un coche con ese id");
        }
        await vendedoresCollection.updateOne(
            {_id: new ObjectId(args.idVendedor)},
            {
                $push: {
                    coches: new ObjectId(args.idCoche)
                },
            }
        )
        return await vendedoresCollection.findOne({_id: new ObjectId(args.idVendedor)});
    },
    anadirVendedorAConcesionario: async(
        _: unknown,
        args: {
            idVendedor: string,
            idConcesionario: string
        }
    ): Promise<concesionarioSchema | undefined> => {
        const existevendedor = await vendedoresCollection.findOne({_id: new ObjectId(args.idVendedor)});
        if(!existevendedor){
            throw new Error("No existe un vendedor con ese id");
        }
        const existeConcesionario = await concesionariosCollection.findOne({_id: new ObjectId(args.idConcesionario)});
        if(!existeConcesionario){
            throw new Error("No existe un concesionario con este id");
        }
        await concesionariosCollection.updateOne(
            {_id: new ObjectId(args.idConcesionario)},
            {
                $push: {
                    vendedores: new ObjectId(args.idVendedor)
                },
            }
        )
        return await concesionariosCollection.findOne({_id: new ObjectId(args.idConcesionario)});
    }
}