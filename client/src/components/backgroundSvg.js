import './../css/backgroundSvg.css';

let Svg = ()=>{
  return(
    <div className='backgroundSvgContainer'>
    <svg 
      className='svg'
      width='268'
      height='150'
      viewBox='0 0 268 150'
      >
      <path 
        d=' M0 0 L 268 0 L 268 150 L 0 150 Z '
        fill='#6D92FF'
        // opacity='0.5'
        />
      <path 
        d=' M0 30 C 100 0 , 168 100,268 0 L 268 150 L 0 150 Z '
        fill='#90ACFF'
        // opacity='0.5'
        />
        <path 
        d=' M0 100 C 100 0, 168 100,268 20 L 268 150 L 0 150 Z '
        fill='#C1D0FF'
        // opacity='0.5'
        />
        
</svg>
    
    </div>
    )
}
export default Svg;