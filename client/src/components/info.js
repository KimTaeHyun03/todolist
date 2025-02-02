import './../css/info.css';
import { useState, useEffect } from 'react';
import supabase from './../supabaseClient.js'; // Supabase 클라이언트 임포트
import { useSelector,useDispatch } from 'react-redux';
import { setActive } from './../store.js';



const Info = () => {
  let dispatch = useDispatch();
  const [userData, setUserData] = useState(null); // 사용자 정보 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    dispatch(setActive(3));
    const fetchUserData = async () => {
      setLoading(true);

      // ✅ 1. 현재 로그인한 사용자의 UUID 가져오기 (auth.users)
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user) {
        console.error('로그인한 사용자 정보를 가져오는 중 오류 발생:', authError?.message);
        setLoading(false);
        return;
      }

      const userUUID = authUser.user.id; // 현재 로그인한 사용자의 UUID
      const fullName = authUser.user.user_metadata?.full_name || '이름 없음'; // auth.users에서 full_name 가져오기

      // ✅ 2. public.users에서 email, nickname 가져오기
      const { data, error } = await supabase
        .from('users') // public.users 테이블
        .select('email, nickname')
        .eq('uuid', userUUID) // ✅ 현재 로그인한 사용자의 UUID와 비교
        .single(); // 단일 결과 가져오기

      if (error) {
        console.error('쿼리 오류:', error.message);
      } else {
        setUserData({
          email: data.email,
          nickname: data.nickname,
          full_name: fullName, // auth.users 대신 가져온 이름 사용
        });
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <div className='infoContainer'>
      <div className='infoTitle'>
        <h2>사용자 정보</h2>
        {loading ? (
          <p>정보를 불러오는 중...</p>
        ) : userData ? (
          <div>
            <p><strong>이메일:</strong> {userData.email}</p>
            <p><strong>닉네임:</strong> {userData.nickname}</p>
            <p><strong>이름:</strong> {userData.full_name}</p>
          </div>
        ) : (
          <p>사용자 정보를 가져올 수 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Info;