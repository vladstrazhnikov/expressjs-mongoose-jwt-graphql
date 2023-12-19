import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} from 'graphql';
import { MemoryType } from './types.js';
import { Memory } from './schemas.js';

export const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        memory: {
            type: MemoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Memory.findById(args.id);
            },
        },
        memories: {
            type: new GraphQLList(MemoryType),
            resolve() {
                return Memory.find({});
            },
        },
    },
});
