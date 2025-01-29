import './../css/main.css';
import './../css/gap.css';

import FloatingBtn from './floatingBtn.js';

import {useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setActive } from './../store.js';
import { FaPlus } from "react-icons/fa";



let Main =()=>{
  let[categori,setCategori] = useState(['중요','덜중요','하든지 말든지','asdf','qwer','ddd','dddd','dddas']);
  
  let dispatch = useDispatch();
  
  
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행
    dispatch(setActive(1)); // 예시로 상태를 2로 설정
  }, []);
  
  return(
    <>
    <div className='mainContainer'>
      {categori.map((item, index) => 
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