import './style.css';
import { Link } from 'react-router-dom';
import { ReactComponent as House2 } from '../Menu/icon/house.svg';
import { ReactComponent as Play } from '../Menu/icon/play-fill.svg';
import { ReactComponent as Like } from '../Menu/icon/heart.svg';
import { ReactComponent as Serie } from '../Menu/icon/collection-play.svg';
import { ReactComponent as Filmes } from '../Menu/icon/film.svg';
import { ReactComponent as Lista } from '../Menu/icon/list.svg';
import { Display } from 'react-bootstrap-icons';

function Menu() {
   
function oclick(e){
  const mebu = document.querySelector('.listaMenu')
  const cont = document.querySelector('.container2')
if(e){
mebu.classList.toggle('listaMenu2')
cont.classList.toggle('blur')
}
}
  return (
    <div className='paiMenu'>

    <div className='MenuLat'>
    <Link  to='/'><div className='icons-menu'><House2 className='icon-menu2'  /><span className='opcoes-menu'>Home</span></div></Link>
    <Link  to='/favoritos'><div className='icons-menu'><Like className='icon-menu2'  /><span className='opcoes-menu'>Favoritos</span></div></Link>
    <div className='icons-menu'><Filmes className='icon-menu2'  /><span className='opcoes-menu opcoes-menu2'>Filmes</span></div>
    <Link to='/Serie'><div className='icons-menu'><Serie className='icon-menu2'   /><span className='opcoes-menu opcoes-menu2'>Series</span></div></Link>


    </div>
<div><input className='boxMenu' onClick={(e)=> oclick(e)} type='checkbox'/><Lista className='menuHamb'/></div>
<ul className='listaMenu'>
  <Link className='lista-menu' to='/favoritos'><Like className='icon-hamb'  /><span className='opcoes-menu3'>Favoritos</span></Link>
  <Link className='lista-menu' to='/Serie'><Serie className='icon-hamb'   /><span className='opcoes-menu3'>Series</span></Link>
  <li className='lista-menu'><Filmes className='icon-hamb'  /><span className=' opcoes-menu3'>Filmes</span></li>
</ul>
</div>


  );
}

export default Menu;
