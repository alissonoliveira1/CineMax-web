import './favoritos.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
function Favoritos(){
const [filme,setfilme] = useState([])
useEffect(()=>{

const minhalista = localStorage.getItem("@baflix")
setfilme(JSON.parse(minhalista) || [])

},[])

function excluirf(id){
  let filtrofilmes = filme.filter((item)=>{
    return ( item.id !== id )

    
  })
    setfilme(filtrofilmes)
    localStorage.setItem('@baflix', JSON.stringify(filtrofilmes))
    toast.success("Filme removido com sucesso!")
    }
    

    return(
<div>
<div className='fav2'><h1>Filmes Salvos</h1></div>


{filme.length === 0 && <span className='vaziofav'>Voce não adicionou nenhum filme aos favoritos</span>}

<div>
    <ul>
        {filme.map((item) =>{
            return(
               
           <li className='paifav' key={item.id}>
            
            <div className='imgfav'><img src={`https://image.tmdb.org/t/p//original/${item.backdrop_path}`}/></div>
            <span className='titulofav'>{item.title}</span>
            <div className='detalhesfav'>
               <div><Link className='detalhesfavbutton' to={`/filme/${item.id}`}>Detalhes</Link></div> 
              <div><button onClick={()=> excluirf(item.id)} className='buttonfav'>Excluir</button></div>
            </div>
           </li>
            )
            })}
    </ul>
</div>
</div>




    )
}
export default Favoritos