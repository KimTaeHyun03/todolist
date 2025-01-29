import Calendar1 from 'react-calendar';
import './../css/calendar.css';
import {useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setActive } from './../store.js';

let Calendar = ()=>{
  
  let dispatch = useDispatch();
  
  
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행
    dispatch(setActive(2)); // 예시로 상태를 2로 설정
  }, []);
  return(
    <div>
      <Calendar1/>
      
      
      
    </div>
    )
}

export default Calendar;