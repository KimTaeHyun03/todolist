import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true }
});

export async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL 연결 성공");
    client.release();
  } catch (err) {
    console.error("❌ PostgreSQL 연결 실패:", err.message);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
}

export default pool;