import pool from '../config/db';
import bcrypt from 'bcrypt';

export const findUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0]; // Return the user if found
};

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
  return result.rows[0]; // Return the newly created user
};