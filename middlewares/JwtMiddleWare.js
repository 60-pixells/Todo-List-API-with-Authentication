import jwt from 'jsonwebtoken';
import * as constants from "../constants/GenericConstants.js"

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (token == null) {
        return res.status(401).json({error: "UnAuthorized"});
    }

    jwt.verify(token, constants.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403);
        }
        req.user = user;
        next();
    });
}