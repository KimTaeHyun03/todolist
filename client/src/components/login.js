import './../css/login.css';

import {useState} from 'react';
import {Link} from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

let Login = ()=>{
  
  let [showPw,setShowPw] = useState(false);
  
  return(
    <div className='loginContainer'>
      <div className='loginfilterContainer'/>
     {/*
     <Link to='/main'>임시이동</Link>
     */} 
     <div className='loginBothContainer'>
      <div className='loginTopContainer'>
        <FaUserCircle className='loginIcon1'/>
        <h1 className='loginTitle'>Login</h1>
        
      </div>
      <div className='loginBottomContainer'>
        
        <input 
        type='text'
        placeholder='아이디를 입력하세요'
        className='loginInput'
        />
        
        <input 
        type={showPw ? 'text' : 'password'}
        placeholder='비밀번호를 입력하세요'
        className='loginInput'
        />
        <input 
        type={showPw ? 'text' : 'password'}
        placeholder='비밀번호를 또 입력하세요'
        className='loginInput'
        />
          <label className='loginPwShowContainer'
          >
        <input type='checkbox' onChange={()=>{
          setShowPw(!showPw);
        }}></input>    
            <span>비밀번호 보기</span>
          </label>
        
        
      </div>
      
      </div>
    </div>
    
    )
}
export default Login;