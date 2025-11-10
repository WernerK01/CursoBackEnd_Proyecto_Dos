import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
};