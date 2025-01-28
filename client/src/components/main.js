import './../css/main.css';
import './../css/gap.css';

import FloatingBtn from './floatingBtn.js';

import {useState} from 'react';

import { FaPlus } from "react-icons/fa";

let Main =()=>{
  let[categori,setCategori] = useState(['중요','덜중요','하든지 말든지','asdf','qwer','ddd','dddd','dddas']);
  
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