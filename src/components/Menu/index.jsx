import './style.css';
import { Link } from 'react-router-dom';
import { ReactComponent as House2 } from '../Menu/icon/house.svg';
import { ReactComponent as Like } from '../Menu/icon/heart.svg';
import { ReactComponent as Serie } from '../Menu/icon/collection-play.svg';
import { ReactComponent as Filmes } from '../Menu/icon/film.svg';
import { UserContext }  from '../../contexts/user'
import { useContext } from 'react';
function Menu() {
   const {photo} = useContext(UserContext)

  async function handleMenu(){
   document.querySelector('.containerMSuspenso').classList.toggle('activeSuspenso')
  }

  return (
    <div className='paiMenu'>

    <div className='MenuLat'>
    <Link  to="/home"><div className='icons-menu'><span className='opcoes-menu opcoes-menu2'>Home</span></div></Link>
    <Link  to='/favoritos'><div className='icons-menu'><span className='opcoes-menu opcoes-menu2'>Favoritos</span></div></Link>
    <Link to='/FilmePag'><div className='icons-menu'><span className='opcoes-menu opcoes-menu2'>Filmes</span></div></Link>
    <Link to='/Serie'><div className='icons-menu'><span className='opcoes-menu opcoes-menu2'>Series</span></div></Link>
   

    </div>
 <div className='icons-menu2 ' onClick={handleMenu} ><div>{photo.map((e,index)=>{return(<div key={index} className='combo-avatar'><div className='div-image-perfil'><img className='img-perfil' src={e.usuario} alt="avatar" /></div></div>)})}</div></div>
</div>


  );
}

export default Menu;
