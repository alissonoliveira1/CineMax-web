
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services";
import './style.css'
import axios from "axios";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import { Link } from "react-router-dom";

function SeriePage() {

  const { id } = useParams();
  const navegate = useNavigate();
  const [load, setload] = useState(true);
  const [filme, setfilme] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [episodes, setEpisodes] = useState([]);
  
  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/tv/${id}`, {
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

  


  const loadEpisodes = async (seasonNumber) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`, {
        params: {
          api_key: '9f4ef628222f7685f32fc1a8eecaae0b',
          language: "pt-BR",
        }
      });
      setEpisodes(response.data.episodes);
    } catch (error) {
      console.error('Erro ao carregar os episódios:', error);
    }
  };

 
  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);
    loadEpisodes(selectedSeason); 
  };
console.log(selectedSeason)

  if (load) {
    return <div className="detalhes">Carregando detalhes...</div>;
  }


  




  return (
    <div key={filme.id}>
      <Header/>
      <div className="conjunto">
      <img
        className="capa"
        alt={filme.name}
        src={`https://image.tmdb.org/t/p//original/${filme.backdrop_path}`}
      /></div>
      <div className="info">
      <h1 className="tituloFilme">{filme.name}</h1>
      <span className="subtitulo">{filme.overview}</span>
      <div className="paiSelect">
      <select className="selectTemp" value={selectedSeason} onChange={handleSeasonChange}>
        {filme.seasons.map((i) => {
          return( 
            <option value={i.season_number}  key={i.id}>
         
                {i.name}
              
            </option>
          )
        })}
      </select></div>
      <div className="titleEps"><h2>Episodios</h2></div>
      
      <ul className="paiEps">
        {episodes.map((episode) => (
          <Link to={`/Play/${filme.id}/${episode.season_number}/${episode.episode_number}`}>
          <li className="listaEps" key={episode.id}><img className="imagemSerie" src={`https://image.tmdb.org/t/p//original/${episode.still_path}`}/><div><div className="pai_ep_time"><span className="nomeEps">{episode.name}</span><span className="timeEps">{episode.runtime}min</span></div><div className="descEps"><span>{episode.overview}</span></div></div></li>
        </Link>
        ))}
      </ul>
      </div>
    
      <div>
     
      </div>
<MenuMobile/>
    </div>
  );
}
export default SeriePage;
