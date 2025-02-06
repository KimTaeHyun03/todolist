// 필요한 모듈 가져오기
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
// import axios from 'axios';
import loginRoute from './routes/login.js';
import signupRoute from './routes/signup.js';
import supabase from './client/src/supabaseClient.js'; // ✅ Supabase 클라이언트 import
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
console.log('라우트 연결 시작', loginRoute);
app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);
console.log('라우트 연결 완료');

// 데이터베이스 연결 후 서버 실행
//supabase 사용중
async function startServer() {
  // await connectDB(); // PostgreSQL 연결 확인
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}
startServer();

/*app.use(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>" 구조에서 추출

  if (!token) {
    res.status(401).json({ error: '인증 토큰이 필요합니다.' });
    return;
  }

  try {
    // ✅ Supabase에서 토큰 검증
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
      return;
    }

    req.user = user; // 요청 객체에 사용자 정보 추가
    next(); // ✅ 인증 성공하면 다음 미들웨어 실행
  } catch (err) {
    res.status(500).json({ error: '서버 내부 오류 발생' });
  }
});*/
//카테고리 추가 api
app.post('/api/category', async (req, res) => {
  console.log('🔄 [API] 카테고리 추가 요청 도착');

  const { categoryName, userId } = req.body;
  console.log('📥 [PAYLOAD] categoryName:', categoryName, 'userId:', userId);

  if (!categoryName || !userId) {
    console.log('❌ [API ERROR] 필수 데이터 누락');
    return res
      .status(400)
      .json({ error: 'categoryName과 userId가 필요합니다.' });
  }

  console.log('🔄 [DB QUERY] 카테고리 삽입 시도');

  try {
    const { data, error } = await supabase
      .from('category')
      .insert([{ name: categoryName, user_id: userId }])
      .select();

    if (error) {
      console.error('❌ [DB ERROR] 카테고리 삽입 실패:', error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log('✅ [DB SUCCESS] 카테고리 삽입 성공:', data);
    res.status(201).json({ message: '카테고리 추가 성공', category: data });
  } catch (error) {
    console.error('❌ [SERVER ERROR] 서버 내부 오류:', error.message);
    res.status(500).json({ error: '서버 오류 발생' });
  }
});
//카테고리 가져오는 api
app.get('/api/categories', async (req, res) => {
  console.log('🔄 [API] 로그인한 사용자의 카테고리 조회 요청');

  const token = req.headers.authorization?.split(' ')[1];
  
  console.log('📌 [DEBUG] 요청받은 토큰:', token); // ✅ 토큰 값 로그로 확인

  if (!token) {
    console.error('❌ [AUTH ERROR] 인증 토큰이 없습니다.');
    return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
  }

  try {
    // ✅ Supabase에서 JWT 토큰 검증
    console.log('🔄 [AUTH] Supabase에서 토큰 검증 중...');
    const { data, error } = await supabase.auth.getUser(token);

    console.log('📌 [DEBUG] Supabase auth.getUser(token) 반환 값:', data);

    if (error || !data || !data.user) {
      console.error('❌ [AUTH ERROR] 유효하지 않은 토큰:', error?.message);
      return res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
    }

    const userId = data.user.id;
    console.log('✅ [AUTH SUCCESS] 사용자 확인 완료 - userId:', userId);
    
    console.log('🔄 [DB QUERY] 로그인한 사용자의 카테고리 조회 시도');

    const { data: categories, error: dbError } = await supabase
      .from('category')
      .select('*')
      .eq('user_id', userId);

    console.log('📌 [DEBUG] Supabase category 조회 결과:', categories);

    if (dbError) {
      console.error('❌ [DB ERROR] 카테고리 조회 실패:', dbError.message);
      return res.status(500).json({ error: dbError.message });
    }

    console.log('✅ [DB SUCCESS] 카테고리 조회 성공:', categories);
    res.status(200).json({ categories });
  } catch (error) {
    console.error('❌ [SERVER ERROR] 서버 내부 오류:', error);
    res.status(500).json({ error: '서버 오류 발생' });
  }
});

app.get('/api/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.error('❌ [AUTH ERROR] 인증 토큰이 필요합니다.');
    return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
  }

  try {
    console.log('🔄 [AUTH] 토큰 검증 시작...');
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error('❌ [AUTH ERROR] 유효하지 않은 토큰:', error?.message);
      return res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
    }

    // ✅ 현재 로그인한 사용자의 UUID 가져오기
    console.log('✅ [AUTH SUCCESS] 사용자 확인 완료:', user);
    const userId = user.id;

    // ✅ 자기 자신의 정보만 조회 가능하도록 설정
    console.log('🔄 [DB QUERY] 사용자 정보 조회 시도...');
    const { data, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('uuid', userId)
      .single();

    if (userError) {
      console.error(
        '❌ [DB ERROR] 사용자 데이터 조회 실패:',
        userError.message
      );
      return res.status(403).json({ error: '권한이 없습니다.' });
    }

    console.log('✅ [DB SUCCESS] 사용자 데이터 조회 성공:', data);
    res.json(data);
  } catch (err) {
    console.error('❌ [SERVER ERROR] 서버 내부 오류:', err.message);
    res.status(500).json({ error: '서버 오류 발생', details: err.message });
  }
});

//이 아래에는 api삽입 하면 안됨
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
