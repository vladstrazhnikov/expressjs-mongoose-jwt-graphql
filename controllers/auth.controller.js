import { Role, User } from '../graphql/schemas.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secretKey } from '../jwtconfig.js';

function generateAccessToken(id, roles, callback) {
    const payload = {
        id,
        roles
    }

    jwt.sign(payload, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            console.error('Error signing JWT:', err);
            callback(err, null);
        } else {
            callback(null, token);
        }
    });
}

export default class AuthController {
    async signup(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'error', errors });
            }

            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (candidate) {
                return res.status(400).json({ message: 'Username is not available' });
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({ value: 'USER' });
            const user = User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json({ message: 'Your account has been successfully created' });
        } catch (error) {
            console.log(error);
        }
    }

    async signin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json('The username or password is incorrect');
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json('The username or password is incorrect');
            }

            generateAccessToken(user._id, user.roles, (err, accessToken) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.json({ accessToken });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers() {

    }
}