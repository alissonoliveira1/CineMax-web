import Serie from "../Serie";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services";
import './style.css'
import axios from "axios";
function SeriePage() {
  const { id } = useParams();
  const navegate = useNavigate();
  const [load, setload] = useState(true);
  const [filme, setfilme] = useState([]);
  const [temp, settemp] = useState([]);
  const [eps, seteps] = useState([]);
  const [numerotemp, setnumerotemp] = useState([]);
  
  const [episodios, setEpisodios] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [seasons, setSeasons] = useState([]);
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
          settemp(response.data);
          setnumerotemp(response.season_number);
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

  useEffect(() => {
    // Função para carregar as temporadas da série
    const loadSeasons = async () => {
      try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
          params: {
            api_key: '9f4ef628222f7685f32fc1a8eecaae0b',
            language: "pt-BR",
          }
        });
        setSeasons(response.data.seasons);
      } catch (error) {
        console.error('Erro ao carregar as temporadas:', error);
      }
    };

    loadSeasons();
  }, []);



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

  // Função para lidar com a mudança de temporada selecionada
  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);
    loadEpisodes(selectedSeason); // Carregar os episódios da temporada selecionada
  };
console.log(selectedSeason)

  if (load) {
    return <div className="detalhes">Carregando detalhes...</div>;
  }
  return (
    <div key={filme.id}>
      <div className="conjunto">
      <img
        className="capa"
        alt={filme.name}
        src={`https://image.tmdb.org/t/p//original/${filme.backdrop_path}`}
      /></div>
      <div className="info">
      <h1 className="tituloFilme">{filme.name}</h1>
      <span className="subtitulo">{filme.overview}</span>
      <select value={selectedSeason} onChange={handleSeasonChange}>
        {filme.seasons.map((i) => {
          return( 
            <option value={i.season_number}  key={i.id}>
         
                {i.name}
              
            </option>
          )
        })}
      </select>
      <h2>Episódios:</h2>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}><img className="imagemSerie" src={`https://image.tmdb.org/t/p//original/${episode.still_path}`}/>{episode.name}</li>
        ))}
      </ul>
      </div>
    
      <div>
     
      </div>
    </div>
  );
}
export default SeriePage;
