import '../css/bottomBar.css';
import '../css/gap.css';
import MenuSideTab from './menuSideTab.js';
import { useState, useEffect } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { BsCalendar2DayFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setActive } from './../store.js';



let BottomBar = () => {
  //메뉴 상태 관리 스테이트
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  let dispatch = useDispatch();
  
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => {
      if (!prevState) {
        // 메뉴가 열릴 때 히스토리 상태 추가
        window.history.pushState({ menuOpen: true }, "");
      }
      return !prevState;
    });
  };

  // 뒤로가기 시 메뉴 닫기 처리
  useEffect(() => {
    const handlePopState = (event) => {
      if (isMenuOpen) {
        setIsMenuOpen(false); // 메뉴 닫기
        
        window.history.pushState(null, document.title, window.location.href);
        
      }
    };

    window.addEventListener("popstate", handlePopState);
    
    // 페이지가 로드될 때 현재 URL을 pushState로 덮어씌워 뒤로가기 방지
    window.history.pushState(null, document.title, window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isMenuOpen]);

  
    
  //하단 네비게이션바 스테이트
  
  let active = useSelector((state) => state.active ) ;
  

  //메뉴 상태 관리 함수
  let menuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let chActive = value => {
    dispatch(setActive());
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
            dispatch(setActive(1));
          }}
          to='/main'
        >
          <FaListUl />
        </Link>
        <Link
          className={`bottombarMenuBtn md-4 ${active === 2 ? 'active' : ''}`}
          onClick={() => {
            dispatch(setActive(2));
          }}
          to='./calendar'
        >
          <BsCalendar2DayFill />
        </Link>
        <Link
          className={`bottombarMenuBtn md-4 ${active === 3 ? 'active' : ''}`}
          onClick={() => {
            dispatch(setActive(3));
          }}
          to='/info'
        >
          <FaUser />
        </Link>
        <MenuSideTab isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </div>
  );
};
export default BottomBar;
