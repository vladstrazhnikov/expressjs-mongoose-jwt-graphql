import { GraphQLSchema } from 'graphql';
import mongoose from 'mongoose';
import { Query } from './memory/queries.js';
import { Mutation } from './memory/mutations.js';

export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Roles' }]
});

const roleSchema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: 'USER'
    },
});

const memorySchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    media: String,
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0], // Default to (0, 0) if no coordinates provided
        },
    },
});

export const Role = mongoose.model('Role', roleSchema);
export const User = mongoose.model('User', userSchema);
export const Memory = mongoose.model('Memory', memorySchema);