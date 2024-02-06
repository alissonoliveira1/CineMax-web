import { useState, useEffect } from "react"
import { Await } from "react-router-dom";
import { Link } from "react-router-dom"
import './style.css'
import api from "../../services/";
import axios from "axios";


function Serie(){
const [Serie, setserie] = useState([])
const [SerieAnime, setserieAnime] = useState([])

useEffect(()=>{
const fetchData = async () => {
    try{
       const  response =  await api.get("discover/tv?",{
        params: {
            api_key:'9f4ef628222f7685f32fc1a8eecaae0b',
            language:'pt-br',
            page: 1,
            with_genres: 16,
        },  
       });
     setserie(response.data.results)
      
    }catch(error){
        console.log("erro")
    }
    
}
fetchData()

const fetchData2 = async () =>{
    try{
        const response2 = await api.get("discover/tv?",{
            params:{
                api_key:'9f4ef628222f7685f32fc1a8eecaae0b',
                language: 'pt-br',
                page: 1,
                with_genres: 10759,
            }
        })
        setserieAnime(response2.data.results)
    }catch(error){
        console.log("error")
    }
}
fetchData2()
},[]);

    return(
        <div className="container2">
        <div>Series</div>
        
        <div className="list-filmes">
            {Serie.map((item) =>{
            return(
                <div className="capa-Filme" key={item.id}>
                   <Link to={`/SeriePage/${item.id}`}><img className="imagem" src={`https://image.tmdb.org/t/p//original/${item.poster_path}`}/></Link> 
                 
                </div>
            )
        })}</div>

<div className="list-filmes">
            {SerieAnime.map((item) =>{
            return(
                <div className="capa-Filme"  key={item.id}>
                   <Link to={`/SeriePage/${item.id}`}><img className="imagem" src={`https://image.tmdb.org/t/p//original/${item.poster_path}`}/></Link> 
                 
                </div>
            )
        })}</div>
        </div>
    )
}
export default Serie