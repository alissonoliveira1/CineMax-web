import Home from "../home";
import "./style.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import api from "../../services";
import { toast } from "react-toastify";
import {ReactComponent as Core} from '../filme/icon/heart.svg'
import {ReactComponent as Play} from '../filme/icon/play-fill.svg'


function Filme() {
  const [genes,setgenes] = useState([]);
  const [genes2,setgenes2] = useState();
  const { id } = useParams();
  const navegate = useNavigate();
  const [load, setload] = useState(true);
  const [filme, setfilme] = useState([]);
  const [semelhantes, setsemelhantes] = useState([])
const genreIds = filme.genres ? filme.genres.map((genre) => genre.id) : [];
  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            language: "pt-BR",
          },
        })

        .then((response) => {
          setfilme(response.data);
          
          setload(false);
        })
        .catch(() => {
          console.log("filme não encontrado");
          navegate("/", { replace: true });
          return;
        });
      
    }
    
    
    loadFilme();
     
    return () => {};
  }, [navegate, id]);

useEffect(()=>{
    const semes = async () =>{
    try{
     const datas = await api.get("discover/movie",{
       params: {
         api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
         language: "pt-BR",
         with_genres: await genreIds.join(','),
       },
     })
     setgenes(datas.data.results)
    }catch(error){
console.log("filme genero nao encontrado")
    }
   }
  semes()


}, [genreIds])

  const releaseYear = filme.release_date ? filme.release_date.substring(0, 4) : '';
  const durationInMinutes = filme.runtime || 0;

  // Calcula as horas e minutos
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  function salvarfilme() {
    const minhalista = localStorage.getItem("@baflix");

    let filmessalvos = JSON.parse(minhalista) || [];

    const hasfilme = filmessalvos.some(
      (filmessalvo) => filmessalvo.id === filme.id
    );

    if (hasfilme) {
      toast.warn("Este filme ja esta Salvo!");
      return;
    }
    filmessalvos.push(filme);
    localStorage.setItem("@baflix", JSON.stringify(filmessalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (load) {
    return <div className="detalhes">Carregando detalhes...</div>;
  }

  return (
    <div className="filme_info2">
      <div className="conjunto">
        <img
          className="capa"
          alt={filme.title}
          src={`https://image.tmdb.org/t/p//original/${filme.backdrop_path}`}
        />
      </div>
      <div className="info">

        <div>
          <h1 className="tituloFilme">{filme.title}</h1>
        <h3 className="data">{releaseYear} {hours}hrs {minutes}min</h3>
        </div>
        

        <h3 className="sinopse"><strong>Sinopse</strong></h3>
        
        <span className="subtitulo">{filme.overview}</span>
        <div className="generosid"><span>Generos:</span> <div className="generos">{filme.genres.map((e)=>{
          return(
            <div className="nameGenere" key={e.id}>{e.name}, </div>
          )
        })}</div></div>
   
          <div className="buttons">
          <a
              target="blank"
              rel="external"
              href={`https://superflixapi.top/filme/${filme.imdb_id}`}
            >
              <button className="trailer"><Play className="playFilme"/></button>
            </a>
            <button onClick={salvarfilme} className="salvar">
              <Core className="salvarFilme"/>
            </button>
           
      
        </div>
        
        <div className="titulosSeme2"><span>Titulos Semelhantes</span></div>
       <div className="FilmePaiSg">
        {genes.slice(0,10).map((e)=>{
          return( 
            <div className="loucura" key={e.id}><Link to={`/filme/${e.id}`}><img
            className="imagemFilmes"
            alt={e.title}
            src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
          /></Link></div>
          )
        })}</div>
      </div>
      </div>
 
  );
}
export default Filme;
