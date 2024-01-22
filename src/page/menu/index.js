import './style.css'
import { Link } from 'react-router-dom';
import { ReactComponent as House2 } from '../menu/icon/house.svg';
import { ReactComponent as Play } from '../menu/icon/play-fill.svg';
import { ReactComponent as Like } from '../menu/icon/heart.svg';
import { ReactComponent as Serie } from '../menu/icon/collection-play.svg';
import { ReactComponent as Filmes } from '../menu/icon/film.svg';
function Menu(){
    return(
        <div className='MenuLat'>
        <div className='icons-menu'><Link to='/'><House2 width={30} height={30} color="Red" /></Link><span className='opcoes-menu'>Home</span></div>
        <div className='icons-menu'><Link to='/favoritos'><Like width={30} height={30} color="Red" /></Link><span className='opcoes-menu'>Favoritos</span></div>
        <div className='icons-menu'><Serie width={30} height={30} color="Red" /><span className='opcoes-menu opcoes-menu2'>Series</span></div>
        <div className='icons-menu'><Filmes width={30} height={30} color="Red" /><span className='opcoes-menu opcoes-menu2'>Filmes</span></div>
    </div>
    )
}
export default Menu