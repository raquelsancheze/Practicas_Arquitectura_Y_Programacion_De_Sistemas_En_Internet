import {vendedorSchema, cocheSchema} from "../db/schema.ts"
import {cochesCollection} from "../db/dbconnection.ts"

export const vendedoresCoches = (parent: vendedorSchema): Promise<cocheSchema | undefined>[] => {
    return parent.coches.map(async (elem) => await cochesCollection.findOne({_id: elem}));
}