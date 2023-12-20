import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} from 'graphql';
import { MemoryType } from '../types.js';
import { Memory } from '../schemas.js';
import { getMemories, getMemory } from './resolvers.js';

export const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        memory: {
            type: MemoryType,
            args: { id: { type: GraphQLID } },
            resolve: getMemory,
        },
        memories: {
            type: new GraphQLList(MemoryType),
            resolve: getMemories,
        },
    },
});
