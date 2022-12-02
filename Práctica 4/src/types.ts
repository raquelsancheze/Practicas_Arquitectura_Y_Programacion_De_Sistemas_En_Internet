import {ObjectId} from "mongo"

export type vendedor = {
    id: string,
    nombre: string,
    coches: coche[],
    dni: string
}

export type coche = {
    matricula: string,
    marca: string,
    asientos: number,
    id: string,
    precio: number
}

export type concesionario = {
    nombre: string,
    ciudad: string,
    id: string,
    vendedores: vendedor[],
}