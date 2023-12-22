import { GraphQLSchema } from 'graphql';
import { Query } from './memory/queries.js';
import { Mutation } from './memory/mutations.js';

export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});