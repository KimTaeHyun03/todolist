import '../css/menuSideTab.css';
import BackgroundSvg from './backgroundSvg.js';
import { useState } from 'react';
import { GoX } from 'react-icons/go';
import { BiSolidCategory } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

import {useNavigate} from 'react-router-dom';


let MenuSideTab = ({ setIsMenuOpen, isMenuOpen }) => {
  //메뉴 상태 관리 함수
  let menuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  let navigate = useNavigate();
  let navigatePage = (route)=>{
    navigate(route);
  }
  
  let [dropdown,setDropdown] = useState(false);
  let activeDropdown = ()=>{
    setDropdown(!dropdown);
  }
  
  
  
  return (
    <>
      <div
        className={`menusideContainer ${isMenuOpen ? 'menusideTabOpen' : ''}`}
      >
        <div className='subtitleContainer'>
          <BackgroundSvg/>
          <GoX onClick={menuOpen} className='topbarMenuCloseBtn' />
        <h1 className='menusideTabSubtitle'>To Do List</h1>
        </div>
        <div className='menusideTabListContainer'>
          {/* 아래의 div에 dropdown이 트루일때 보여줄 div들 만들어놓기(카테고리) */}
          <div className='menusideTabList'
          onClick={activeDropdown}
          >
            <div className='innerDiv'>
              <BiSolidCategory />
              <span>Category</span>
              {
                !dropdown ? <IoMdArrowDropdown className='IoMdArrowDropdown'/> : <IoMdArrowDropup className='IoMdArrowDropdown'/>
              }
              
            
            </div>
          </div>
          <div className='menusideTabList'>
            <div className='innerDiv'>
<IoIosSettings />
<span>Setting</span>
            </div>
          </div>
          <div className='menusideTabList'>
            <div className='innerDiv'>
              1
            </div>
          </div>
          
        </div>
      
      
      
      
      
      </div>
      <div
        className={`menusideBackground ${isMenuOpen ? 'menusideTabBack' : ''}`}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      ></div>
    </>
  );
};
export default MenuSideTab;
