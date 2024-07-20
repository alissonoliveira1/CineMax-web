import React, { useState, useEffect, useRef } from 'react';
import ColorThief from 'colorthief';
import './style.css';
const Colorbackground = ({imageSrc}) => {
const [color, setColor] = useState("");
const imageRef = useRef(null);

useEffect(()=>{
const img = imageRef.current
if(img.complete){
    extractColor(img)
}else{
    img.addEventListener('load',() =>extractColor(img))
}

},[imageSrc])


    const extractColor = (img) =>{
        const colorThief = new ColorThief();   
        const color = colorThief.getColor(img)
        setColor(`rgb(${color[0]},${color[1]},${color[2]})`)
        
        
    }
 
    
return(
    <div  className='boxShadow'>
 
    <div style={{ boxShadow: `0px 0px 100px 100px ${color}`, backgroundColor:color }} className='div-mobile-color'><img className='imgBackground' ref={imageRef} src={imageSrc} alt="Movie or Show" style={{ backgroundColor:color }}  crossOrigin="anonymous"/></div>
    <div style={{ boxShadow: `0 100px 50px 140px ${color}`, backgroundColor:color }} className='shadow-background-div'></div>
  </div>
);


}
export default Colorbackground;