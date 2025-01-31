import './../css/login.css';

import {useState} from 'react';
import {Link} from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';

let Login = ()=>{
  
  let [showPw,setShowPw] = useState(false);
  let [loginId,setLoginId] = useState('');
  let [loginPw,setLoginPw] = useState('');
  
  let loginClick= async ()=>{
    try{
      let response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`,
      {
        sendId:loginId,
        sendPw:loginPw
      });
      alert(response.data.message);
    } catch(error){
      alert(error.response.data.message);
    }
  }
  
  return(
    <div className='loginContainer'>
      <div className='loginfilterContainer'/>
     

     
     <div className='loginBothContainer'>
      <div className='loginTopContainer'>
        <FaUserCircle className='loginIcon1'/>     <Link to='/main'>임시이동</Link>
        <h1 className='loginTitle'>Login</h1>
        
      </div>
      <div className='loginBottomContainer'>
        
        <input 
        type='text'
        placeholder='아이디를 입력하세요'
        className='loginInput'
        value={loginId}
        onChange={(e)=>{
          setLoginId(e.target.value);
        }}
        />
        {loginId}
        <input 
        type={showPw ? 'text' : 'password'}
        placeholder='비밀번호를 입력하세요'
        className='loginInput'
        value={loginPw}
        onChange={(e)=>{
          setLoginPw(e.target.value);
        }}
        />
        {loginPw}
        {/*<input 
        type={showPw ? 'text' : 'password'}
        placeholder='비밀번호를 또 입력하세요'
        className='loginInput'
        />*/}
          <label className='loginPwShowContainer'
          >
        <input type='checkbox' onChange={()=>{
          setShowPw(!showPw);
        }}></input>    
            <span>비밀번호 보기</span>
          </label>
        
        <br/>
        <div 
        className='loginBtnContainer'>
          <span
          className='loginBtn'
          onClick={loginClick}
          >
            로그인
          </span>
        </div>
        
      </div>
      
      </div>
    </div>
    
    )
}
export default Login;