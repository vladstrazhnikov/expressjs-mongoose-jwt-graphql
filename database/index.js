import mongoose from 'mongoose';

const mongodbUrl = 'DB URL IS HERE';

export const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};