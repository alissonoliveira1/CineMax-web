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
    <div className='boxShadow'>
 
    <img className='imgBackground' ref={imageRef} src={imageSrc} alt="Movie or Show" style={{ boxShadow: `0 0 180px 160px ${color}`  }} crossOrigin="anonymous"/>
  </div>
);


}
export default Colorbackground;