import './header.css'
import { Link } from 'react-router-dom';
import Menu from '../Menu';
import { useState, useEffect} from 'react';
import Pesquisas from '../Pesquisas';
import Logo from '../../assets/images/CineMax.png'
import LogoMobile from '../../assets/images/logoMobile.png'
function Header(){
  const [poster, setPoster] = useState("");
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
  
    useEffect(() => {
      const tela480 = window.matchMedia("(max-width: 480px)");
  
      const handleResize = (e) => {
        if (e.matches) {
          setPoster("poster_path");
        } else {
          setPoster("backdrop_path");
        }
      };
      handleResize(tela480); 
      tela480.addEventListener('change', handleResize);
  
   
      return () => tela480.removeEventListener('change', handleResize);
    }, []);
  


    return(
        <div className={appClasses}>
       <header >
        {poster === 'poster_path' && (
           <Link  to="/home"><div className='logoMobile'><img alt='logo' src={LogoMobile}/></div></Link>
          )}
        {poster === 'backdrop_path' && (
           <Link  to="/home"><div className='logo'><img alt='logo' src={Logo}/></div></Link>
          )}

        
        <div className='conjuntomenu'>
          <div><Pesquisas/></div>
        <div><Menu/></div>  
   
        </div>
       
       </header> </div>
    )
}
export default Header;