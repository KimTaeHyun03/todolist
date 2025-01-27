import '../css/menuSideTab.css';
import MenuSideTab from './menuSideTab.js';
import {useState} from 'react';
import { CiMenuKebab } from 'react-icons/ci';

let TopBar =()=>{
  //메뉴 상태 관리 스테이트
  let [isMenuOpen,setIsMenuOpen] = useState(false);
  //메뉴 상태 관리 함수
  let menuOpen = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  
  return(
    <div className='topbarContainer'>
      <span className='topbarMenuBtn'><CiMenuKebab onClick={menuOpen} 
      /></span>
      <h2>To Do List</h2>
      <MenuSideTab isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <MenuSideTab isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      </div>
    )
}
export default TopBar;