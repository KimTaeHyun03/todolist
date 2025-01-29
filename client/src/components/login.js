import './../css/login.css';

import {Link} from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

let Login = ()=>{
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
        
      </div>
      
      </div>
    </div>
    
    )
}
export default Login;