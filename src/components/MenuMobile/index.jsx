import { Link } from "react-router-dom"
import './style.css'
import { ReactComponent as House2 } from '../../assets/icons/house.svg';
import { ReactComponent as Like } from '../../assets/icons/heart.svg';
import { ReactComponent as Serie } from '../../assets/icons/collection-play.svg';
import { ReactComponent as Filmes } from '../../assets/icons/film.svg';


import { UserContext }  from '../../contexts/user'
import { useContext } from 'react';
export default function MenuMobile(){

    const {photo} = useContext(UserContext)

    async function handleMenu(){
     document.querySelector('.containerMSuspenso').classList.add('activeSuspenso')
    }

    
    return(
      <div>  
        <div className="container-menu-Mobile">
      <div className="Pai-menu-mobile">
      <div className="div-opcoes-mobile home-mobile"><Link className="mobi-name-icon"  to='/Home'><House2 className="icon-menu-Mobile"/><div><span>Inicio</span></div></Link></div>
   <div className="div-opcoes-mobile"><Link className="mobi-name-icon" to='/Serie'><  Serie className="icon-menu-Mobile"/><div ><span>Serie</span></div></Link></div>
   <div className="div-opcoes-mobile"><Link className="mobi-name-icon"  to='/FilmePag'><Filmes className="icon-menu-Mobile"/><div><span>Filme</span></div></Link></div>
   <div className="div-opcoes-mobile"><Link className="mobi-name-icon"  to='/favoritos'><Like className="icon-menu-Mobile"/><div><span>Favoritos</span></div></Link></div>
   <div > <div className='icons-menu' onClick={handleMenu} ><div>{photo.map((e,index)=>{return(<div key={index} className='combo-avatar'><div className='div-image-perfil'><img className='img-perfil' src={e.usuario} alt="avatar" /></div></div>)})}</div></div></div>
   </div>
  </div >
        <div className="barraespaco"></div>
      </div>
    )
}