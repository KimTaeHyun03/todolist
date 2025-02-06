import './../css/main.css';
import './../css/gap.css';

import FloatingBtn from './floatingBtn.js';
import { useState, useEffect } from 'react';
import fetchCategories from './../function/fetchCategories.js'; // ✅ API에서 데이터 가져오기

const Main = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      //alert('데이터 요청 시작'); // 요청 시작 알림

      try {
        const data = await fetchCategories(); // API에서 데이터 가져오기
        setCategories(data);
        //alert('데이터 요청 성공'); // 데이터 로드 성공 알림
      } catch (error) {
        //alert('데이터 요청 실패: ' + error.message); // 에러 발생 시 알림
      }
    };

    loadCategories();
  }, []);

  return (
    <>
      <div className='mainContainer'>
        {categories.map((item) => 
          <span key={item.id}>
            <div className='mainCircleContainer'>
              {item.name}
            </div>
          </span>
        )}
      </div>
      <FloatingBtn />
    </>
  );
};

export default Main;