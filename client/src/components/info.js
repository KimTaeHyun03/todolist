
import './../css/info.css';
import {useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setActive } from './../store.js';

let Info = ()=>{
  
  let dispatch = useDispatch();
  
  
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행
    dispatch(setActive(3)); // 예시로 상태를 2로 설정
  }, []);
  return(
    <div>
      
      
      dhdjs
      
    </div>
    )
}

export default Info;