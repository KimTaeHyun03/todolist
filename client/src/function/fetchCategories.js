import axios from 'axios';
import supabase from './../supabaseClient.js';

// ✅ Node.js API에서 카테고리 목록 가져오기
const fetchCategories = async () => {
  const { data: session, error } = await supabase.auth.getSession();

  // ✅ 세션 정보 로그 확인
  console.log('🔑 [DEBUG] Supabase 세션 정보:', session);

  const token = session?.session?.access_token; // ✅ 현재 로그인된 사용자의 access_token 가져오기

  if (!token) {
    alert('❌ 인증 토큰이 없습니다. 로그인이 필요합니다.');
    console.error('❌ [ERROR] access_token이 존재하지 않음.');
    return [];
  }

  try {
    console.log('📥 [FRONT] GET 요청 보내는 중: http://localhost:3030/api/categories');

    const response = await axios.get('http://localhost:3030/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ 토큰 포함
        'Content-Type': 'application/json'
      }
    });

    console.log('📤 [FRONT] API 응답 받음:', response.data);
    return response.data.categories;
  } catch (error) {
    console.error('❌ API 요청 실패:', error);
    alert('❌ API 요청 실패: ' + error.message);
    return [];
  }
};

export default fetchCategories;