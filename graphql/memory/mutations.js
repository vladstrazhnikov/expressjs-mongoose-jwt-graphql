import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
} from 'graphql';
import { MemoryType } from '../types.js';
import { addMemory, updateMemory } from './resolvers.js';

export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMemory: {
            type: MemoryType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                date: { type: new GraphQLNonNull(GraphQLString) },
                media: { type: new GraphQLNonNull(GraphQLString) },
                coordinates: { type: new GraphQLList(GraphQLFloat) },
            },
            resolve: addMemory,
        },
        updateMemory: {
            type: MemoryType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                date: { type: new GraphQLNonNull(GraphQLString) },
                media: { type: new GraphQLNonNull(GraphQLString) },
                coordinates: { type: new GraphQLList(GraphQLFloat) },
            },
            resolve: updateMemory,
        },
    },
});