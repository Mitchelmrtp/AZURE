import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/constants.js';

/**
 * Hash a password using bcrypt
 */
export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a password with a hash
 */
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

/**
 * Generate a JWT token
 */
export const generateToken = (payload, expiresIn = '24h') => {
    return jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT token
 */
export const verifyToken = (token) => {
    return jwt.verify(token, CONFIG.JWT_SECRET);
};

/**
 * Decode a JWT token without verification (for inspection)
 */
export const decodeToken = (token) => {
    return jwt.decode(token);
};
