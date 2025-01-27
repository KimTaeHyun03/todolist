import '../css/topBar.css';
import {useState} from 'react';
import { GoX } from "react-icons/go";

let MenuSideTab =({setIsMenuOpen,isMenuOpen})=>{
  //메뉴 상태 관리 함수
  let menuOpen = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  
  return(
    <>
    <div className={`menusideContainer ${isMenuOpen ? 'menusideTabOpen' : ''}`}>
      <div className='subtitleContainer'>
      <GoX
      onClick={menuOpen}
      className='topbarMenuCloseBtn'
      />
      <h2 className='subtitle'>메뉴창임</h2>  
      </div>
      
      
      
      
    </div>
    <div 
    className={`menusideBackground ${isMenuOpen ? 'menusideTabBack' : ''}`}
    onClick={()=>{setIsMenuOpen(!isMenuOpen)}}
    ></div>
    </>
    )
}
export default MenuSideTab;