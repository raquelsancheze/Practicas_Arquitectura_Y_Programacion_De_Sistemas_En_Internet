import {coche, vendedor, concesionario} from "../types.ts";
import {ObjectId} from "mongo";

export type cocheSchema = Omit<coche, "id"> & {
    _id: ObjectId
};

export type vendedorSchema = Omit<vendedor, "id" | "coches"> & {
    _id: ObjectId,
    coches: ObjectId[]
};

export type concesionarioSchema = Omit<concesionario, "id" | "vendedores"> & {
    _id: ObjectId,
    vendedores: ObjectId[]
};