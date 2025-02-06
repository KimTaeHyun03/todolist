import { createClient } from '@supabase/supabase-js';

// ✅ 환경 변수에서 Supabase URL과 API Key 가져오기
const supabaseUrl = 'https://dzwrqscrhbghwuqadyzs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6d3Jxc2NyaGJnaHd1cWFkeXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0ODE0NzksImV4cCI6MjA1NDA1NzQ3OX0.9mYOtowRGmSJ60AkKH15ExKO4nitKzshyjUoJN-KalM';


const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  persistSession: true, // ✅ 세션 유지 활성화
  autoRefreshToken: true // ✅ 토큰 자동 갱신 활성화
});

// ✅ Node.js 환경에서는 `localStorage` 사용 X (브라우저에서만 실행)
if (typeof window !== "undefined") {
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔄 [AUTH] 상태 변경 감지:', event, session);

    if (session?.access_token) {
      window.localStorage.setItem('access_token', session.access_token);
    } else {
      window.localStorage.removeItem('access_token');
    }
  });

  // ✅ 앱이 실행될 때 Supabase 세션을 자동으로 가져오기
  (async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('❌ [ERROR] Supabase 세션 불러오기 실패:', error.message);
    } else {
      console.log('✅ [AUTH] 현재 로그인된 세션:', data.session);
    }
  })();
}

export default supabase;