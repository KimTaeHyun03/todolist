import './../css/login.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import Signup from './../components/signup.js';

let Login = () => {
  
  return (
    <div className='loginContainer'>
      <div className='loginfilterContainer' />

      <div className='loginBothContainer'>
        <div className='loginTopContainer'>
          <FaUserCircle className='loginIcon1' />{' '}
          <Link to='/main'>임시이동</Link>
          {/*<h1 className='loginTitle'>Login</h1>*/}
        </div>
        <div className='loginBottomContainer'>
          
         
            <Signup />
          </div>
        </div>
      </div>
    
  );
};

export default Login;
