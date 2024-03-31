import Users from '../models/ToDo.js';

export async function validateUserName(userName) {
    // Regular expression to match only alphabets (case insensitive)
    const alphabetRegex = /^[a-zA-Z]+$/;

    // Check if the username contains only alphabets
    if (!alphabetRegex.test(userName)) {
        throw new Error('Username should contain only alphabets');
    }

    // Check if the username exists in the Users collection in the database
    const existingUserObj = await Users.findOne({ userName });
    if (existingUserObj) {
        throw new Error('Username already exists');
    }
}

export function validatePassword(password) {
    // Check if password is at least 8 characters long

    if (!password) {
        throw new Error('Please enter password');
    }
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }

    // Check if password contains at least one lowercase letter, one uppercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;
    if (!passwordRegex.test(password)) {
        throw new Error('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character');
    }
}

export async function validateUserId(userId) {
    // Check if the userId exists in the Users collection in the database
    const existingUser = await Users.findOne({ userId });
    if (!existingUser) {
        throw new Error('User does not exists');
    }
}

export async function checkUserId(userName) {
    const existingUser = await Users.findOne({ userName });
    if (existingUser) {
        throw new Error('User already exists with the username');
    }
}