import {cochesCollection, vendedoresCollection, concesionariosCollection} from "../db/dbconnection.ts";
import {ObjectId} from "mongo";
import {coche, vendedor, concesionario} from "../types.ts";
import {cocheSchema, concesionarioSchema, vendedorSchema} from "../db/schema.ts";

export const Query = {
    obtenerCochesId: async(
        _: unknown,
        args: {
            id: string
        }
    ): Promise<coche | null> => {
        try{
            const coche = await cochesCollection.findOne({_id: new ObjectId(args.id)});
            if(coche){
                return{
                    ...coche,
                    id: coche.toString()
                };
            }
            else{
                return null;
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    },
    obtenerCochePrecio: async(
        _: unknown,
        args: {
            precioMaximo: number,
            precioMinimo: number
        }
    ): Promise<cocheSchema[] | null> => {
        try{
            let coches = await cochesCollection.find().toArray();
            if(coches){
                coches = coches.filter(elem => elem.precio < args.precioMaximo);
                coches = coches.filter(elem => elem.precio > args.precioMinimo);
                return coches.map((elem) => ({
                    ...elem,
                    id: elem._id.toString()
                }))
            }
            else{
                return null;
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    },
    obtenerVendedorId: async(
        _: unknown,
        args: {
            id: string
        }
    ): Promise<vendedorSchema | null> => {
        try{
            const vendedor = await vendedoresCollection.findOne({_id: new ObjectId(args.id)});
            if(vendedor){
                return{
                    ...vendedor
                };
            }
            else{
                return null;
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    },
    obtenerVendedorNombre: async(
        _: unknown,
        args: {
            nombre: string
        }
    ): Promise<vendedorSchema[] | null> => {
        try{
            let vendedores = await vendedoresCollection.find({nombre: args.nombre}).toArray();
            if(vendedores){
                return vendedores.map((elem) => ({
                    ...elem,
                    id: elem._id.toString()
                }))
            }
            else{
                return null;
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    },
    obtenerConcesionario: async(
        _: unknown,
        args: {
            id: string
        }
    ): Promise<concesionarioSchema | null> => {
        try{
            const concesionario = await concesionariosCollection.findOne({_id: new ObjectId(args.id)});
            if(concesionario){
                return{
                    ...concesionario
                };
            }
            else{
                return null;
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    },
    obtenerConcesionarioCiudad: async(
        _: unknown,
        args: {
            ciudad: string,
            paginas: number
        }
    ): Promise<concesionarioSchema[] | null> => {
        try{
            let query = {};
            query = {
                ciudad: args.ciudad
            }
            let concesionarios = await concesionariosCollection.find(query).skip(Number(args.paginas) * 10).limit(10).toArray();
            if(concesionarios){
                return concesionarios.map((elem) => ({...elem}));
            }
            else{
                return null;
            }
        }
        catch(error){
            console.error(error);
            throw new Error(error);
        }
    }
}