import {vendedorSchema, concesionarioSchema} from "../db/schema.ts"
import {vendedoresCollection} from "../db/dbconnection.ts"

export const concesionarioVendedores = (parent: concesionarioSchema): Promise<vendedorSchema | undefined> [] => {
    return parent.vendedores.map(async (elem) => await vendedoresCollection.findOne({_id: elem}));
}
