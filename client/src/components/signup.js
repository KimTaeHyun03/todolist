import { useState, useEffect } from "react";
import supabase from "./../supabaseClient.js";

const Signup = () => {
  const [user, setUser] = useState(null); // 로그인 상태 관리

  // 🔹 Supabase Auth 상태 변경 리스너를 등록하여 토큰을 localStorage에 저장
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          // 세션이 존재하면 토큰 정보를 localStorage에 저장
          localStorage.setItem(
            "supabase.auth.token",
            JSON.stringify(session)
          );
          console.log("토큰 저장됨:", session);
        } else {
          // 로그아웃 시 토큰 삭제
          localStorage.removeItem("supabase.auth.token");
          console.log("토큰 삭제됨");
        }
      }
    );

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 🔹 로그인 상태 확인
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user); // 로그인된 사용자 정보 저장
        
        
        window.location.replace("http://localhost:3000/main");
      } else {
        setUser(null); // 로그아웃 상태
      }
    };
    checkUser();
  }, []);

  // 🔹 로그아웃 함수
  const handleLogout = async () => {
    await supabase.auth.signOut(); // 강제 로그아웃
    localStorage.removeItem("supabase.auth.token");
    sessionStorage.removeItem("supabase.auth.token");

    console.log("✅ 로그아웃 완료");
    alert("로그아웃 되었습니다.");

    setUser(null); // 로그아웃 시 상태 업데이트
    window.location.reload(); // 세션 초기화
  };

  // 🔹 Google 로그인 함수
  const handleGoogleLogin = async () => {
    await supabase.auth.signOut(); // 기존 세션 초기화
    console.log("Google 로그인 요청 시작...");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/main`, // 로그인 후 리디렉션 URL
      },
    });

    if (error) {
      console.error("Google 로그인 오류:", error.message);
    } else {
      // OAuth 로그인은 리디렉션 방식이므로 실제 토큰 저장은
      // onAuthStateChange 리스너에서 처리됩니다.
      setUser(data.user); // 로그인 성공 후 사용자 정보 저장 (있는 경우)
      console.log("Google 로그인 성공! 응답 데이터:", data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* 🔹 로그인 상태에 따라 "사용자 이메일" 또는 "Login" 표시 */}
        <h1 className="text-2xl font-bold">{user ? user.id : "Login"}</h1>

        {/* 📌 Google 로그인 버튼 */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mt-2"
        >
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Signup;