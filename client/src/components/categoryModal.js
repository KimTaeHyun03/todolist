import '../css/categoryModal.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryToServer } from './../store.js';
import supabase from '../supabaseClient.js';

let CategoryModal = () => {
  let dispatch = useDispatch();
  let categories = useSelector((state) => state.categories);
  let [categoryBeforePush, setcategoryBeforePush] = useState('');

  


let categoryPushState = async () => {
  if (!categoryBeforePush.trim()) {
    alert("카테고리 이름을 입력하세요!");
    return;
  }

  // ✅ 현재 로그인한 사용자 정보 가져오기
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    alert("로그인이 필요합니다.");
    return;
  }

  // ✅ JWT 토큰 가져오기
  const { data: session, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session || !session.session) {
    alert("로그인 세션이 만료되었습니다. 다시 로그인하세요.");
    return;
  }

  const accessToken = session.session.access_token;

  try {
    // ✅ JWT 토큰을 포함하여 API 요청
    const response = await fetch('http://localhost:3030/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // ✅ 토큰 포함
      },
      body: JSON.stringify({
        categoryName: categoryBeforePush.trim(),
        userId: user.id,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("카테고리 추가 성공!");
    } else {
      alert("카테고리 추가 실패: " + result.error);
    }
  } catch (err) {
    console.error("❌ API 요청 실패:", err);
    alert("서버 오류 발생");
  }

  setcategoryBeforePush('');
};
  return (
    <div className='categoryModalContainer'>
      <div className='categoryModalTitle'>
        <h2>카테고리 추가</h2>
      </div>
      <div className='categoryModalMainContainer'>
        <input
          type='text'
          value={categoryBeforePush}
          placeholder='카테고리 입력하세요'
          className='categoryModalInput'
          onChange={(e) => {
            setcategoryBeforePush(e.target.value);
          }}
        />
        <span
          onClick={categoryPushState}
          className='categoryModalAddBtn'
        >
          카테고리 추가
        </span>
      </div>
    </div>
  );
};

export default CategoryModal;