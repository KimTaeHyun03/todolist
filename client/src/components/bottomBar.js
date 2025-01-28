import '../css/bottomBar.css';
import '../css/gap.css';
import MenuSideTab from './menuSideTab.js';
import { useState, useEffect } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { Link } from 'react-router-dom';

let BottomBar = () => {
  //메뉴 상태 관리 스테이트
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  //하단 네비게이션바 스테이트
  let [active, setActive] = useState(() => {
    // 세션 스토리지에서 초기값 가져오기
    const savedActive = sessionStorage.getItem('active');
    return savedActive ? parseInt(savedActive) : 1; // 기본값 1
  });

  //메뉴 상태 관리 함수
  let menuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let chActive = value => {
    setActive(value);
  };

  useEffect(() => {
    sessionStorage.setItem('active', active);
  }, [active]);

  return (
    <div className='containerbottom'>
      <div className='bottomBarLineContainer'>
        <span
          className='bottombarLine'
          style={{
            transform: `translateX(${active * 100}%)`
          }}
        ></span>
      </div>
      <div className='bottombarContainer'>
        <span className={'bottombarMenuBtn md-4'} onClick={menuOpen}>
          <CiMenuKebab />
        </span>
        <Link
          className={`bottombarMenuBtn md-4 ${active === 1 ? 'active' : ''}`}
          onClick={() => {
            chActive(1);
          }}
          to='/'
        >
          과제
        </Link>
        <Link
          className={`bottombarMenuBtn md-4 ${active === 2 ? 'active' : ''}`}
          onClick={() => {
            chActive(2);
          }}
          to='./calendar'
        >
          캘린더
        </Link>
        <Link
          className={`bottombarMenuBtn md-4 ${active === 3 ? 'active' : ''}`}
          onClick={() => {
            chActive(3);
          }}
          to='/'
        >
          내정보
        </Link>
        <MenuSideTab isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </div>
  );
};
export default BottomBar;
