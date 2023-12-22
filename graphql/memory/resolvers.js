import { Memory } from "../../models/Memory.model.js";
import { secretKey } from "../../jwtconfig.js";
import jwt from 'jsonwebtoken';

export const addMemory = (parent, args, context) => {
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
    return memory.save();
}

export const getMemory = (parent, args) => {
    return Memory.findById(args.id);
}

export const getMemories = (parent, args, context) => {
    return Memory.find({});
}

export const updateMemory = (parent, args, context) => {
    
}