import { Memory } from "../schemas.js";

export const addMemory = (parent, args) => {
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
}

export const getMemory = (parent, args) => {
    return Memory.findById(args.id);
}

export const getMemories = (parent, args) => {
    return Memory.find({});
}