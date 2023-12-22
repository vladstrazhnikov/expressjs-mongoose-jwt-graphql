import mongoose from 'mongoose';

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

export const Role = mongoose.model('Role', roleSchema);
export const User = mongoose.model('User', userSchema);