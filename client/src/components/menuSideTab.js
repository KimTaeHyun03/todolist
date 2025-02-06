import '../css/menuSideTab.css';
import BackgroundSvg from './backgroundSvg.js';
import CategoryModal from './categoryModal.js';
import { useState } from 'react';
import { GoX } from 'react-icons/go';
import { BiSolidCategory } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';

import { useNavigate } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';
import { addCategories,deleteCategories } from './../store.js';



let MenuSideTab = ({ setIsMenuOpen, isMenuOpen }) => {
  //메뉴 상태 관리 함수
  let menuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let navigate = useNavigate();
  let navigatePage = route => {
    navigate(route);
  };

  let [dropdown, setDropdown] = useState(false);
  let activeDropdown = () => {
    setDropdown(!dropdown);
  };
  
  let categories = useSelector((state) => state.categories ) ;

  let [categoryAdd,setCategoryAdd] = useState(false);
  return (
    <>
      <div
        className={`menusideContainer ${isMenuOpen ? 'menusideTabOpen' : ''}`}
      >
        <div className='subtitleContainer'>
          <BackgroundSvg />
          <GoX onClick={menuOpen} className='topbarMenuCloseBtn' />
          <h1 className='menusideTabSubtitle'>To Do List</h1>
        </div>
        <div className='menusideTabListContainer'>
          {/* 아래의 div에 dropdown이 트루일때 보여줄 div들 만들어놓기(카테고리) */}
          <div className='menusideTabList' onClick={activeDropdown}>
            <div className='innerDiv'>
              <BiSolidCategory />
              <span>Category</span>
              {!dropdown ? (
                <IoMdArrowDropdown className='IoMdArrowDropdown' />
              ) : (
                <IoMdArrowDropup className='IoMdArrowDropdown' />
              )}
            </div>
          </div>
          {dropdown ? (
          <>
            <div className='menusideTabList'
            onClick={()=>{
            setCategoryAdd(!categoryAdd);
            setIsMenuOpen(!isMenuOpen);
          }}
            >
              <div className='innerinnerDiv'>
          <span >카테고리 추가</span>
          </div>
          </div>
          {
                  categories.map((item, index) => 
          <span key={index}>
            <div className='menusideTabList'>
              <div className='innerinnerDiv'>
                <span>{item}</span>
              </div>
              
            </div>
          </span>
      )}
          </>) : null}
          <div className='menusideTabList'>
            <div className='innerDiv'>
              <IoIosSettings />
              <span>Setting</span>
            </div>
          </div>
          <div className='menusideTabList'>
            <div className='innerDiv'>1</div>
          </div>
        </div>
      </div>
      <div
        className={`menusideBackground ${isMenuOpen ? 'menusideTabBack' : ''}`}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      ></div>
      {categoryAdd ? <CategoryModal/> : null}
    </>
  );
};

export default MenuSideTab;
