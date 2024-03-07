import { Link } from "react-router-dom"
import './style.css'
import { ReactComponent as House2 } from './icon/house.svg';
import { ReactComponent as Play } from './icon/play-fill.svg';
import { ReactComponent as Like } from './icon/heart.svg';
import { ReactComponent as Serie } from './icon/collection-play.svg';
import { ReactComponent as Filmes } from './icon/film.svg';
import { ReactComponent as Lista } from './icon/list.svg';
import { ReactComponent as Sair } from './icon/door-open.svg';
import { auth } from '../../firebaseConnect';
import { signOut } from 'firebase/auth';

export default function MenuMobile(){
    async function handleSair(){
        await signOut(auth)
      }
    return(
        <div className="container-menu-Mobile">
            <div className="Pai-menu-mobile">
         <div className="div-opcoes-mobile"><Link to='/Serie'><  Serie className="icon-menu-Mobile"/></Link></div>
         <div className="div-opcoes-mobile"><Link to='/FilmePag'><Filmes className="icon-menu-Mobile"/></Link></div>
         <div className="div-opcoes-mobile home-mobile"><Link to='/Home'><House2 className="icon-menu-Mobile"/></Link></div>
         <div className="div-opcoes-mobile"><Link to='/favoritos'><Like className="icon-menu-Mobile"/></Link></div>
         <div ><button onClick={handleSair} className='button-Sair-Mobile'><Sair className="icon-menu-Mobile"/></button></div>
         </div>
        </div >
    )
}