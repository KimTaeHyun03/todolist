import { useState, useEffect } from "react";
import supabase from "./../supabaseClient.js";

const Signup = () => {
  const [user, setUser] = useState(null); // 로그인 상태 관리

  // 🔹 로그인 상태 확인
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user); // 로그인된 사용자 정보 저장
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
    redirectTo: `${window.location.origin}/main`, // 수정된 부분
  },
});

    if (error) {
      console.error("Google 로그인 오류:", error.message);
    } else {
      setUser(data.user); // 로그인 성공 후 사용자 정보 저장
      console.log("Google 로그인 성공! 응답 데이터:", data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        
        {/* 🔹 로그인 상태에 따라 "사용자 이메일" 또는 "Login" 표시 */}
        <h1 className="text-2xl font-bold">
          {user ? user.id : "Login"}
        </h1>

        {/* 📌 Google 로그인 버튼 */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mt-2"
        >
          Google 계정으로 로그인
        </button>

        {/* 📌 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition mt-2"
        >
          로그아웃
        </button>

      </div>
    </div>
  );
};

export default Signup;