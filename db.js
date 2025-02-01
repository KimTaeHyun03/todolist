import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL + "?sslmode=require", // 🔥 `sslmode=require` 추가
  ssl: {
    rejectUnauthorized: false // 🚨 SSL 인증서 문제 해결
  }
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