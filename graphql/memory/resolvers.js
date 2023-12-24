import { Memory } from "../../models/Memory.model.js";
import { secretKey } from "../../jwtconfig.js";
import jwt from 'jsonwebtoken';

export const addMemory = async (parent, args, context) => {
    const bearerToken = context.headers.authorization;
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);

    const memory = new Memory({
        title: args.title,
        description: args.description,
        date: new Date(args.date),
        media: args.media,
        location: {
            type: 'Point',
            coordinates: args.coordinates,
        },
        ownerId: decoded.id,
    });
    return await memory.save();
}

export const getMemory = async (parent, args) => {
    return await Memory.findById(args.id);
}

export const getMemories = async (parent, args) => {
    return await Memory.find({});
}

export const updateMemory = async (parent, args, context) => {
    const bearerToken = context.headers.authorization;
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);

    const memory = await Memory.findById(args.id);

    if (memory.ownerId === decoded.id) {
        const filter = { _id: args.id };
        const update = {
            title: args.title,
            description: args.description,
            date: args.date,
            media: args.media,
            coordinates: args.coordinates,
        };

        return await Memory.findByIdAndUpdate(filter, update);
    }
}