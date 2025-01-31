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
let idpw = JSON.parse(process.env.LOGINIDPW);
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


app.post('/api/login', (req,res)=>{
    let sendIdPw = req.body;
  if (
    sendIdPw.sendId === idpw.loginId &&
    sendIdPw.sendPw === idpw.loginPw
    
  ) {
    res.status(200).json({ message: '로그인 성공' });
  } else {
    res.status(401).json({ message: '로그인 실패' });
  }
})




//이 아래엔 api들어가면 안됨
// React 정적 파일 제공
app.use(express.static(path.join(__dirname, 'client/build')));

// React 라우트 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
