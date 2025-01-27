//라이브러리 임포트
import React from 'react';
import {Routes,Route} from 'react-router-dom';
//컴포넌트 임포트
import TopBar from './components/topBar.js';
import Main from './components/main.js';

//css임포트
import './App.css';


function App() {
  return (
    <div className="App">
      <TopBar/>
            <Routes>
        <Route path='/' element={<Main/>} />
        
      </Routes>
    </div>
  );
}

export default App;
