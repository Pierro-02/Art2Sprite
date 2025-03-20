import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Corrected import: Use named imports
import { findUserByEmail, createUser } from '../models/user';

// --- REGISTER ---
export const register = [
    // Validation middleware
    body('username').isLength({ min: 5 }).trim().escape(),
    body('password').isLength({ min: 8 }),
    body('email').isEmail().normalizeEmail(),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const existingUser = await findUserByEmail(req.body.email); // Use the imported function
            if (existingUser) {
                return res.status(409).json({ message: 'Email already in use' });
            }

            const newUser = await createUser(req.body.email, req.body.password); // Use the function

            res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
        } catch (error) {
            next(error);
        }
    }
];

// --- LOGIN ---
export const login = [
    // Validation middleware
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await findUserByEmail(req.body.email); // Use the imported function
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password!); //IMPORTANT!
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
];