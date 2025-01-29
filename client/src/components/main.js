import './../css/main.css';
import './../css/gap.css';

import FloatingBtn from './floatingBtn.js';

import {useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setActive } from './../store.js';
import { FaPlus } from "react-icons/fa";

import { addCategories,deleteCategories } from './../store.js';


let Main =()=>{
  
  let categories = useSelector((state) => state.categories ) ;
  
  let dispatch = useDispatch();
  
  
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행
    dispatch(setActive(1)); // 예시로 상태를 2로 설정
  }, []);
  
  return(
    <>
    <div className='mainContainer'>
      {categories.map((item, index) => 
          <span>
            <div className='mainCircleContainer'>
              {item}
            </div>
          </span>
      )}
    
    </div>
    
    <FloatingBtn/>
    </>
  )
}
export default Main;