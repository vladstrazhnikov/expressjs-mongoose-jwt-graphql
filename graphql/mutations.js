// graphql/mutations.js
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
} from 'graphql';
import { MemoryType } from './types.js';
import { Memory } from './schemas.js';

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
            resolve(parent, args) {
                const memory = new Memory({
                    title: args.title,
                    description: args.description,
                    date: new Date(args.date),
                    media: args.media,
                    location: {
                        type: 'Point',
                        coordinates: args.coordinates,
                    },
                });
                return memory.save();
            },
        },
    },
});