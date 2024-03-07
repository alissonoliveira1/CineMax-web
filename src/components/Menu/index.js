import './style.css';
import { Link } from 'react-router-dom';
import { ReactComponent as House2 } from '../Menu/icon/house.svg';
import { ReactComponent as Play } from '../Menu/icon/play-fill.svg';
import { ReactComponent as Like } from '../Menu/icon/heart.svg';
import { ReactComponent as Serie } from '../Menu/icon/collection-play.svg';
import { ReactComponent as Filmes } from '../Menu/icon/film.svg';
import { ReactComponent as Lista } from '../Menu/icon/list.svg';
import { ReactComponent as Sair } from '../Menu/icon/door-open.svg';
import { Display } from 'react-bootstrap-icons';
import { auth } from '../../firebaseConnect';
import { signOut } from 'firebase/auth';

function Menu() {
   
  async function handleSair(){
    await signOut(auth)
  }

  return (
    <div className='paiMenu'>

    <div className='MenuLat'>
    <Link  to='/'><div className='icons-menu'><House2 className='icon-menu2'  /><span className='opcoes-menu'>Home</span></div></Link>
    <Link  to='/favoritos'><div className='icons-menu'><Like className='icon-menu2'  /><span className='opcoes-menu'>Favoritos</span></div></Link>
    <Link to='/FilmePag'><div className='icons-menu'><Filmes className='icon-menu2'  /><span className='opcoes-menu opcoes-menu2'>Filmes</span></div></Link>
    <Link to='/Serie'><div className='icons-menu'><Serie className='icon-menu2'   /><span className='opcoes-menu opcoes-menu2'>Series</span></div></Link>
    <div className='icons-menu' onClick={handleSair} ><Sair className='icon-menu2'/><span className='opcoes-menu opcoes-menu2'>Sair</span></div>

    </div>

</div>


  );
}

export default Menu;
