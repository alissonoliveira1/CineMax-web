import './header.css'
import { Link } from 'react-router-dom';
import Menu from '../Menu';
import { useState, useEffect} from 'react';
import Pesquisas from '../Pesquisas';
import Logo from './fav.png'

function Header(){

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const shouldScroll = scrollTop > 50;
  
        setIsScrolled(shouldScroll);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const appClasses = isScrolled ? 'App scrolled' : 'Header';
  
  


    return(
        <div className={appClasses}>
       <header >
        <Link className='logo' to="/home"><img alt='logo' src={Logo}/></Link>
        <div className='conjuntomenu'>
          <div><Pesquisas/></div>
        <div><Menu/></div>  
   
        </div>
       
       </header> </div>
    )
}
export default Header;