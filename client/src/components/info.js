import './../css/info.css';
import { useState, useEffect } from 'react';
import supabase from './../supabaseClient.js'; // Supabase 클라이언트 임포트
import { FaUserCircle } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';
import { setActive } from './../store.js';
import CategoryList from './showCategory.js';


const Info = () => {
    let dispatch = useDispatch();
  const [userData, setUserData] = useState(null); // 사용자 정보 상태
  // email: data.email,
  // nickname: data.nickname,
  // full_name: fullName
  const handleLogout = async () => {
    await supabase.auth.signOut(); // 강제 로그아웃
    localStorage.removeItem("supabase.auth.token");
    sessionStorage.removeItem("supabase.auth.token");

    console.log("✅ 로그아웃 완료");
    alert("로그아웃 되었습니다.");

    // 로그아웃 시 상태 업데이트 
    // 후에 경로를 환경변수로 바꿔야됨 
    window.location.replace('http://localhost:3000');
    
  };
  useEffect(() => {
    const fetchUserData = async () => {
      // ✅ 1. 현재 로그인한 사용자의 UUID 가져오기 (auth.users)
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user) {
        console.error('로그인한 사용자 정보를 가져오는 중 오류 발생:', authError?.message);
        return;
      }

      const userUUID = authUser.user.id;
      const fullName = authUser.user.user_metadata?.full_name || '이름 없음';

      // ✅ 2. public.users에서 email, nickname 가져오기
      const { data, error } = await supabase
        .from('users')
        .select('email, nickname')
        .eq('uuid', userUUID)
        .single();

      if (error) {
        console.error('쿼리 오류:', error.message);
      } else {
        setUserData({
          email: data.email,
          nickname: data.nickname,
          full_name: fullName,
        });
      }
    };

    fetchUserData();
  }, []);
dispatch(setActive(3));
  // ✅ 데이터가 로드되기 전에는 아무것도 표시하지 않음
  if (!userData) return null;

  return (
    <div className='infoContainer'>
      <div className='topContainer'>
      <FaUserCircle className='infoUserIcon'/>
      <span>{userData.full_name}</span>
      <button onClick={handleLogout}
      className='infoLogoutBtn'
      >로그아웃</button>
      
      </div>
      <div className='infoBottomContainer'>
        
        
        
        
      </div>

    </div>
  );
};

export default Info;