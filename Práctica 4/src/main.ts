import {Server} from "std/http/server.ts";
import {GraphQLHTTP} from "gql";
import {makeExecutableSchema} from "graphql_tools";
import {Query} from "./resolvers/query.ts";
import {Mutation} from "./resolvers/mutation.ts";
import {typeDefs} from "./schema.ts"
import {concesionarioSchema} from "./db/schema.ts";
import {vendedorSchema} from "./db/schema.ts";
import {vendedoresCollection} from "./db/dbconnection.ts";
import {cocheSchema} from "./db/schema.ts";
import {cochesCollection} from "./db/dbconnection.ts";
import {concesionarioVendedores} from "./resolvers/concesionario.ts";
import {vendedoresCoches} from "./resolvers/vendedor.ts"

const resolvers = {
    concesionario: {
        vendedores: concesionarioVendedores,
        id: (parent: concesionarioSchema) => parent._id.toString()
    },
    vendedor: {
        coches: vendedoresCoches,
        id: (parent: vendedorSchema) => parent._id.toString()
    },
    coche: {
        id: (parent: cocheSchema) => parent._id.toString()
    },
    Query,
    Mutation
};

const s = new Server({
    handler: async (req) => {
        const {pathname} = new URL(req.url);
        return pathname === "/graphql"
            ? await GraphQLHTTP<Request>({
                schema: makeExecutableSchema({resolvers, typeDefs}),
                graphiql: true,
            })(req)
        : new Response("Not Found", {status: 404});
    },
    port: 8000,
});

s.listenAndServe();

console.log(`Server running on http://localhost:8000/graphql`);