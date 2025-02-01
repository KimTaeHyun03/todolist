// 필요한 모듈 가져오기
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import todoRoutes from './routes/login.js';
import pool, { connectDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 3030;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let idpw = JSON.parse(process.env.LOGINIDPW);

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 모든 요청을 로그로 출력하는 미들웨어 추가
app.use((req, res, next) => {
  console.log(`📥 요청: ${req.method} ${req.url}`);
  next();
});

// 로그인 API 라우트 연결
console.log('라우트 연결 시작', todoRoutes);
app.use('/api/login', todoRoutes);
console.log('라우트 연결 완료');

// 데이터베이스 연결 후 서버 실행
async function startServer() {
  await connectDB(); // PostgreSQL 연결 확인
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}
startServer();
// ✅ 기존 React 정적 파일 제공 및 라우팅 코드 변경 없이 유지
app.use(
  express.static(path.join(__dirname, 'client/build'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        res.setHeader(
          'Cache-Control',
          'no-store, no-cache, must-revalidate, proxy-revalidate'
        );
      } else {
        res.setHeader('Cache-Control', 'public, max-age=0');
      }
    }
  })
);

// React 라우트 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
