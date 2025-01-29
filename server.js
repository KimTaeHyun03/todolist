// 필요한 모듈 가져오기
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3030;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let url = process.env.MONGO_URI;

// MongoDB 연결
let db;
new MongoClient(url)
  .connect()
  .then(client => {
    console.log('DB 연결 성공');
    db = client.db('eaglesKp');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB 연결 실패:', err);
    process.exit(1);
  });

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));








//이 아래엔 api들어가면 안됨
// React 정적 파일 제공
app.use(express.static(path.join(__dirname, 'client/build')));

// React 라우트 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
