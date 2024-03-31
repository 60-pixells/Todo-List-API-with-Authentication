import bcrypt from 'bcrypt';
import {
    validateUserName,
    validatePassword
} from "../validations/UserValidations.js";
import { v4 as uuidv4 } from 'uuid';
import Users from '../models/ToDo.js';
import * as constants from "../constants/GenericConstants.js";
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    try {
        const { userName, password } = req.body;
        await validateUserName(userName);
        validatePassword(password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const userObj = new Users({
            userId: uuidv4(),
            userName,
            password: hashedPassword,
        });
        const response = await userObj.save();
        res.status(200).json({ message: 'User registered successfully', userId: response.userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { userName, password } = req.body;
        const userObj = await Users.findOne({userName});
        if (!userObj || !(await bcrypt.compare(password, userObj.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: userObj.userName }, constants.JWT_SECRET_KEY);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}