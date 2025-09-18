// Middleware to authenticate requests
import jsonwebtoken from 'jsonwebtoken';
import { fail } from '../helper/api.response.js';

export default function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return fail('No token provided').send(res);
    }
    jsonwebtoken.verify(token, process.env.JWT_SECRET || '', (err, user) => {
        if (err) {
            return fail('Invalid token', err).send(res);
        }
        req.userId = user.userId;
        next();
    });
}
