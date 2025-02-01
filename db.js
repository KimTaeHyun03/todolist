import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log("🛠 DATABASE_URL:", process.env.DATABASE_URL); // ✅ 환경변수 값 확인

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL 연결 성공");
    client.release();
  } catch (err) {
    console.error("❌ PostgreSQL 연결 실패:", err.message);
    process.exit(1);
  }
}

export default pool;