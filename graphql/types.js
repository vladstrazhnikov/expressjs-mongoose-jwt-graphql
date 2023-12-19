import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
} from 'graphql';

export const MemoryType = new GraphQLObjectType({
    name: 'Memory',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        date: { type: GraphQLString },
        media: { type: GraphQLString },
        coordinates: { type: GraphQLFloat },
    },
});