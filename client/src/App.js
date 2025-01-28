//라이브러리 임포트
import React from 'react';
import { Routes, Route } from 'react-router-dom';

//컴포넌트 임포트
import BottomBar from './components/bottomBar.js';
import Main from './components/main.js';
import Calendar from './components/calendar.js';

//css임포트
import './App.css';

function App() {
  return (
    <div className='App'>
      <img src='/bgImg.png' alt='bg' className='appBackground'></img>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/test' element={<div>테스트페이지임</div>} />
      </Routes>
      <div className='appBottomNav'>
        <BottomBar/>
      </div>
    
    </div>
  );
}

export default App;
