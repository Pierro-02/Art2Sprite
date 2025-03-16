import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: './backend/config/.env' });

const connectionString = process.env.DATABASE_URL || '';

const pool = new Pool({
  connectionString: connectionString,
});

export default pool;
