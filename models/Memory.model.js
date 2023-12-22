import mongoose from 'mongoose';

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
    ownerId: String,
});

export const Memory = mongoose.model('Memory', memorySchema);