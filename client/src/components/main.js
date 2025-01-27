import './../css/main.css';
import { FaPlus } from "react-icons/fa";
let Main =()=>{
  
  
  return(
  <div className='mainContainer'>  
    <div className='mainAddContainer'>
      <FaPlus className='mainAddBtn'/>
      <input
      className='mainInput'
      type='text'
      placeholder='할 일을 입력하세요'
      
      >
      </input>
      
    </div>
    
    
    
  </div>
    )
}
export default Main;