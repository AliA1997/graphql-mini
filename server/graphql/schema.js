const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

let characters = require('./model');

//Circular references reference things not created yet.

const PersonType = new GraphQLObjectType({
    name: 'Person', 
    fields: () => {
        return {
            //Can specify type in object notation.
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            height: { type: GraphQLString },
            films: { 
                //Make sure you define the datatype defined when defining a new GraphQLList Instance.
                type: new GraphQLList(MovieType),
                resolve: (parentVal) => {
                    return !parentVal.films.length
                    ? []
                    : parentVal.films.map(film => {
                        return axios.get(film).then( res => res.data);
                    })
                }
            },
            homeWorld: {
                type: HomeWorldType,
                resolve: (parentVal) => {
                    return axios.get(parentVal.homeworld).then(res => res.data);
                }
            }
        }
    }
})

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => {
        return {
            title: {type: GraphQLString},
            releaseDate: {
                type: GraphQLString,
                //resolve function takes parentVal and arguments.
                resolve: (parentVal) => {
                    return parentVal.release_date
                }
            }
        }
    }
})
///Define a graphQl type via new GraphQLObjectTYpe({
    //Specify name <-- name: <name>,
    //specify fields <--- fields: <callback> => return properties based on apiodata.
    //for each field returned or property, define a object with a type of a GraphQLDataType
//})
const HomeWorldType = new GraphQLObjectType({
    name: 'HomeWorld',
    fields: () => {
        return {
            name: {type: GraphQLString},
            climate: {type: GraphQLString},
            population: {type: GraphQLString}
        }
    }
})

//THis is where we define queries
//You define queries in the firelds property in the returned object.
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
        return {
            people: {
                type: new GraphQLList(PersonType),
                resolve: () => {
                    return characters
                }
            },
            person: {
                type: PersonType,
                args: { id: { type: GraphQLNonNull(GraphQLInt)}},
                resolve: (parentVal, args) => {
                    return characters.find(person => person.id === args.id);
                }
            }
        }
    },
})

//Mutations
//Type in mutations is the result of the mutation.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        return {
            //A DELETE REQUEST 
            //args or agruments given which is a object, which a type object nested.
            deletePerson: {
                type: PersonType,
                args: { id: { type: GraphQLNonNull(GraphQLInt)}},
                resolve: (parentVal, args) => {
                    let character = characters.find(person => person.id === args.id);
                    characters = characters.filter(person => person.id !== args.id);
                    return {
                        id: character.id,
                        name: character.name
                    }
                } 
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})