
import { Await } from 'react-router-dom';
import Filme from '../filme';
import { useEffect, useState } from 'react';
import api from '../../services/';
import Menu from "../menu/index.js";
import { Link } from 'react-router-dom';

import './style.css'
//movie/now_playing?api_key=9f4ef628222f7685f32fc1a8eecaae0b&language=pt-br

function Home(){
const [Filmes, setFilmes] = useState([])
const [load, setLoad] = useState(true)
const genero = 28
const [filmesPorGenero, setFilmesPorGenero] = useState([]);
const apiKey = '9f4ef628222f7685f32fc1a8eecaae0b';
const generoId = 28;
const anima = 16





     
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=9f4ef628222f7685f32fc1a8eecaae0b&with_genres=${generoId}&language=pt-br`
          );
          const response2 = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=9f4ef628222f7685f32fc1a8eecaae0b&with_genres=${anima}&language=pt-br`
          );
  
          if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
          }
  
          const data = await response.json();
          setFilmesPorGenero(data.results); // Armazena os resultados na variável de estado
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };
        
      fetchData();
    }, [apiKey, generoId,anima]);
  




useEffect(()=> {
    async function loadFilmes(){
  
const response = await api.get("movie/now_playing", {
    params:{
        api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
        language:"pt-BR",
        page:1
        
    }

})

setLoad(false)
 setFilmes(response.data.results)
    }


    loadFilmes()
  
},[])


if(load){
    return(
        <div className='load'><div className='loadd'></div></div>
    )
}

    return(


        <div className='container2'>
            <div>
            <div className='tituloFl'><h1>Lançamentos</h1></div>
            <div className='list-filmes'>
            {Filmes.slice().map((filmes)=>{
               
                return(
                       
                    <article key={filmes.id}>
                     
                        <div className='imagem'>
                        <img alt={filmes.title} src={`https://image.tmdb.org/t/p//original/${filmes.poster_path}`}/>
                        </div>
                        <div className='paitexto'>
                           <strong className='titulo'>
                            {filmes.title}
                        </strong> 
                        </div>
                        
                        <Link className='botao' to={`/filme/${filmes.id}`}>Play</Link>
                    </article>
                )
                
                
            })}
            
            </div>
            <div className='tituloFl'><h1>Filmes de Ação</h1></div>
            <div className='list-filmes'>
            {filmesPorGenero.slice().map((filme)=>{
               
               return(
                      
                   <article key={filme.id}>
                    
                       <div className='imagem'>
                       <img alt={filme.title} src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}/>
                       </div>
                       <div className='paitexto'>
                          <strong className='titulo'>
                           {filme.title}
                       </strong> 
                       </div>
                       
                       <Link className='botao' to={`/filme/${filme.id}`}>Acessar</Link>
                   </article>
               )
            })}
            </div>
                </div>
        </div>
    )
}
export default Home;