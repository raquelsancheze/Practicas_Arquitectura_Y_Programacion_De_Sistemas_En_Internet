import {gql} from "graphql_tag";

export const typeDefs = gql `
    type vendedor {
        id: String!
        nombre: String!
        coches: [coche!]!
        dni: String!
    }
    type coche {
        matricula: String!
        marca: String!
        asientos: Int!
        id: String!
        precio: Float!
    }
    type concesionario {
        nombre: String!
        ciudad: String!
        id: String!
        vendedores: [vendedor!]!
    }
    type Query{
        obtenerCochesId(id: String!): coche
        obtenerCochePrecio(precioMaximo: Float!, precioMinimo: Float!): [coche!]!
        obtenerVendedorId(id: String!): vendedor
        obtenerVendedorNombre(nombre: String!): [vendedor!]
        obtenerConcesionario(id: String!): concesionario
        obtenerConcesionarioCiudad(ciudad: String!): [concesionario!]
    }
    type Mutation{
        anadirCocheAVendedor(idCoche: String!, idVendedor: String!): vendedor!
        anadirVendedorAConcesionario(idVendedor: String!, idConcesionario: String!): concesionario!
        crearCoche(matricula: String!, marca: String!, asientos: Int!, precio: Float!): coche!
        crearVendedor(nombre: String!, dni: String!): vendedor!
        crearConcesionario(nombre: String!, ciudad: String!): concesionario!
    }
`;