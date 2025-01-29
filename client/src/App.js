// 라이브러리 임포트
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// 컴포넌트 임포트
import BottomBar from './components/bottomBar.js';
import Main from './components/main.js';
import Calendar from './components/calendar.js';
import Info from './components/info.js';
import Login from './components/login.js';

// CSS 임포트
import './App.css';

function App() {
  const location = useLocation(); // 현재 경로를 가져옴

  // 로그인 페이지에서는 바텀바를 숨기도록 조건부 렌더링
  const showBottomBar = location.pathname !== '/';
const showImage = location.pathname !== "/"; // 루트('/')가 아닐 때만 이미지 표시
  return (
    <div className='App'>
      {showImage && <img src="/bgImg.png" alt="bg" className="appBackground" />}
      <Routes>
        <Route path='/' element={<Login/>} /> {/* 루트 경로에 로그인 컴포넌트 추가 */}
        <Route path='/main' element={<Main />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/info' element={<Info />} />
        {/*
        <Route path='/category/:categories' element={<Info />} />
        */}
      </Routes>
      {showBottomBar && (
        <div className='appBottomNav'>
          <BottomBar />
        </div>
      )}
    </div>
  );
}

export default App;