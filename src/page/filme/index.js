
import Home from '../home'
import './style.css'
import { useState, useEffect } from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import api from '../../services'
import { toast } from 'react-toastify'

function Filme(){
const { id } = useParams()
const navegate = useNavigate()
const [load,setload] = useState(true)
const [filme,setfilme] = useState([])


useEffect(()=>{
async function loadFilme(){
await api.get(`/movie/${id}`,{
   params:{
    api_key:"9f4ef628222f7685f32fc1a8eecaae0b",
    language:"pt-BR",
          }
        
      })

 
      .then((response)=>{
setfilme(response.data)

setload(false)
})
.catch(()=>{
console.log("filme não encontrado")
navegate("/", {replace:true})
return
      })
    }
    loadFilme()


    return ()=>{


    }
  },[navegate,id])

function salvarfilme(){
    const minhalista = localStorage.getItem("@baflix")

    let filmessalvos = JSON.parse(minhalista) || [];

    const hasfilme = filmessalvos.some((filmessalvo)=> filmessalvo.id === filme.id);

    if(hasfilme){
    toast.warn("Este filme ja esta Salvo!")
    return;
    }
    filmessalvos.push(filme)
    localStorage.setItem("@baflix", JSON.stringify(filmessalvos))
    toast.success("Filme salvo com sucesso!")
    
}




if(load){
    return(
        <div className='detalhes'>Carregando detalhes...</div>
    )
}



return(
    <div className='filme-info'>
        
        <div className='conjunto'>
        
     <img className='capa' alt={filme.title} src={`https://image.tmdb.org/t/p//original/${filme.backdrop_path}`}/>
     </div>
     <div className='info'>
     <h1 className='tituloFilme'>{filme.title}</h1>
     <h3 className='sinopse'><strong>Sinopse</strong></h3>
     <span className='subtitulo'>{filme.overview}</span>
     <div className='pai_info'>
     <div>
     <h3 className='data'>lançado em {filme.release_date}</h3>
     <h3 className='avalia'>Avalicação {filme.vote_average} / 10</h3>
    </div>
    <div className='buttons'>
<button onClick={salvarfilme} className='salvar'>Salvar</button>
<a target="blank" rel='external' href={`https://superflixapi.top/filme/${filme.id}`}><button className='trailer'>Trailer</button></a>
    </div>
</div>
     </div>
   
    </div>
)

}
export default Filme