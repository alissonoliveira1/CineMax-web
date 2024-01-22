
import './style.css'
import mensagem from '../erro/erro.png'
import { Link } from 'react-router-dom'


function Erro(){
    return(
        <div className='container'>
            <div className='divimg'><img className='imagem' alt='imagem erro' src={mensagem}/></div>
            <div className='mensagem'><h2>Esta pagina não existe!!</h2></div>
            <Link className='Home' to="/">Home</Link>

        </div>
    )
}
export default Erro