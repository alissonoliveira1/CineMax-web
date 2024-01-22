import './header.css'
import { Link } from 'react-router-dom';
import Menu from '../../page/menu';
function Header(){
    return(
       <header>
        <Link className='logo' to="/">Ba<span >Fli</span>x</Link>
        <div><Menu/></div>
       </header>
    )
}
export default Header;