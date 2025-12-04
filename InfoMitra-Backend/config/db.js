import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: false,
});

const connectWithRetry = async () => {
  let connected = false;
  while (!connected) {
    try {
      await pool.connect();
      console.log('Terhubung ke Database');
      connected = true;
    } catch (err) {
      console.error('Gagal konek DB, retry 5 detik lagi...', err.message);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

connectWithRetry();

export default pool;
