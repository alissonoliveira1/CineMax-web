import "./style.css";
import { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services";
import { toast } from "react-toastify";
import { ReactComponent as HeartA } from '../../components/apresentaçãoMobile/icon/heart.svg';
import { ReactComponent as Camera } from './icon/camera-reels.svg';
import { ReactComponent as HeartB } from '../../components/apresentaçãoMobile/icon/heart-fill.svg';
import { ReactComponent as Play } from "../filme/icon/play-fill.svg"; 
import { ReactComponent as Left } from "./icon/left.svg";
import { ReactComponent as Right } from "./icon/right.svg";
import { ReactComponent as Share } from "./icon/share.svg";
import axios from "axios";
import { db } from "../../firebaseConnect";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import MenuSuspenso from "../../components/MenuSuspenso";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContext } from "../../contexts/user";
import {
  query,
  where,
  onSnapshot,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc
} from "firebase/firestore";

function Filme() {
  const [filme, setFilme] = useState({});
  const [genes, setGenes] = useState([]);
  const [certificacao, setCertificacao] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [poster, setPoster] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const { user, apiKey } = useContext(UserContext);
  const textToShare = `https://cinemg.netlify.app/filme/${id}`

  const genreIds = useMemo(() => 
    filme.genres ? filme.genres.map((genre) => genre.id) : [],
    [filme.genres]
  );

  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: apiKey,
            language: "pt-BR",
            append_to_response: "release_dates",
          },
        });
        setFilme(response.data);
        setLoad(false);
      } catch (error) {
        console.log("filme não encontrado");
        navigate("/", { replace: true });
      }
    }

    loadFilme();
  }, [id, navigate, apiKey]);

  useEffect(() => {
    async function fetchSimilarMovies() {
      try {
        const response = await api.get("discover/movie", {
          params: {
            api_key: apiKey,
            language: "pt-BR",
            with_genres: genreIds.join(","),
          },
        });
        setGenes(response.data.results);
      } catch (error) {
        console.log("filme genero nao encontrado");
      }
    }

    if (genreIds.length > 0) {
      fetchSimilarMovies();
    }
  }, [genreIds, apiKey]);

  useEffect(() => {
    async function buscarCertificacao() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/release_dates`,
          {
            params: {
              api_key: apiKey,
            },
          }
        );
        
        const { results } = response.data;
        const certificacoes = results.find(
          (result) => result.iso_3166_1 === "BR"
        );

        if (certificacoes) {
          const certificacaoEncontrada = certificacoes.release_dates.find(
            (date) => date.certification !== ""
          );
          if (certificacaoEncontrada) {
            setCertificacao(certificacaoEncontrada.certification);
          }
        }
      } catch (error) {
        console.log("Erro ao buscar a classificação indicativa.");
      }
    }

    buscarCertificacao();
  }, [id, apiKey]);

  const releaseYear = filme.release_date ? filme.release_date.substring(0, 4) : "";
  const durationInMinutes = filme.runtime || 0;
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  useEffect(() => {
    async function fetchFavoritos() {
      if (user) {
        const tarefaRef = collection(db, "cineData");
        const q = query(tarefaRef, where("userUid", "==", user.uid));

        onSnapshot(q, (snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            const data = doc.data().favorito || [];
            lista = [...lista, ...data.map(fav => fav.id)];
          });
          setFavoritos(lista);
        });
      }
    }

    fetchFavoritos();
  }, [user]);

  const isFavorito = favoritos.includes(filme.id);

  const salvarfilme = async () => {
    try {
      const documentoRef = doc(db, "cineData", user.uid);

      if (isFavorito) {
        await updateDoc(documentoRef, {
          favorito: arrayRemove({ id: filme.id, ...filme })
        });
        console.log("Filme removido dos favoritos:", filme.id);
      } else {
        await updateDoc(documentoRef, {
          favorito: arrayUnion({ id: filme.id, ...filme })
        });
        console.log("Filme adicionado aos favoritos:", filme.id);
      }

      const docSnap = await getDoc(documentoRef);
      if (docSnap.exists()) {
        const favoritoArray = docSnap.data().favorito || [];
        setFavoritos(favoritoArray.map((item) => item.id));
      }
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    }
  };

  useEffect(() => {
    const tela480 = window.matchMedia("(max-width: 480px)");

    const handleResize = (e) => {
      if (e.matches) {
        setPoster("poster_path");
      } else {
        setPoster("backdrop_path");
      }
    };
    handleResize(tela480); 
    tela480.addEventListener('change', handleResize);

    return () => tela480.removeEventListener('change', handleResize);
  }, []);

  const settings = {
    className: "Sliders2",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          variableWidth: true,
          centerMode: false,
          slidesToShow: 3,
          slidesToScroll: 4
        }
      }
    ]
  };

  function CustomPrevArrow({ onClick }) {
    return (
      <button className="custom-prev-arrow" onClick={onClick}>
        {<Left className="setas" />}
      </button>
    );
  }

  function CustomNextArrow({ onClick }) {
    return (
      <button className="custom-next-arrow" onClick={onClick}>
        {<Right className="setas" />}
      </button>
    );
  }

  if (load) {
    return (
      <div className="load">
        <div className="loadd"></div>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(textToShare);
      toast.success("Texto copiado para a área de transferência!");
    } catch (err) {
      console.error("Erro ao copiar texto: ", err);
      toast.error("Erro ao copiar texto.");
    }
  };

  return (
    <div className="filme_info2">
      <Header />
      <MenuSuspenso/>
      <div className="conjunto">
      {poster === "poster_path" &&(
        <div>
 <div className="divImgfilme">
                <img
              className="capaMobile"
              alt={filme.title}
              src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}
            />
            
              </div>
              <div className="sombras"></div>
        </div>
             
              
            )}
             {poster === "backdrop_path" &&(
               <img
               className="capa"
               alt={filme.title}
               src={`https://image.tmdb.org/t/p//original/${filme.backdrop_path}`}
             />
            )}
       
      </div>
      <div className="info">
      <div className="div-titulofilme">
          <h1 className="tituloFilme">{filme.title}</h1>
        </div>
        <div className="date-classf-genere">
        <div className="dateClassf">
            <div className="idadeIndicativa">
              {certificacao === "L" && (
                <div className="BoxL">{certificacao}</div>
              )}
            </div>
            <div className="idadeIndicativa">
              {certificacao === "10" && (
                <div className="Box10">{certificacao}</div>
              )}
            </div>
            <div className="idadeIndicativa">
              {certificacao === "12" && (
                <div className="Box12">{certificacao}</div>
              )}
            </div>
            <div className="idadeIndicativa">
              {certificacao === "14" && (
                <div className="Box14">{certificacao}</div>
              )}
            </div>
            <div className="idadeIndicativa">
              {certificacao === "16" && (
                <div className="Box16">{certificacao}</div>
              )}
            </div>
            <div className="idadeIndicativa">
              {certificacao === "18" && (
                <div className="Box18">{certificacao}</div>
              )}
            </div>
            <div className="idadeIndicativa">
              {certificacao < 1 && (
                <div className="BoxI">Classificação Indisponivel</div>
              )}
            </div>
            <h3 className="data">
            <div>{hours}h{minutes}min</div> <div>{releaseYear}</div>
            </h3>
          </div>
          
        </div>
     
        
<div className="buttonPlay"> <Link to={`/FilmePlay/${filme.imdb_id}`}>
            <button className="trailerPlay">
              <Play className="playFilme" /> <span>Assistir agora</span>
            </button>
          </Link></div>
       
          <div className="buttons">
    
    <button  onClick={salvarfilme} className="bnt-page-infos">
      <span>
        {isFavorito ? <div className="icon-name-page"><HeartB className="icon-salvar-page" /> <span className="bnt-text-page">salvo</span></div> : <div className="icon-name-page"><HeartA className="icon-salvar-page"  /><span className="bnt-text-page">salvar</span></div>}
      </span>
      
    </button>
    <button className="bnt-page-infos" onClick={handleShare}><div><Share className="icon-salvar-page" /></div><div><span className="bnt-text-page">compartilhar</span></div></button>
  <button className="bnt-page-infos" ><div><Camera className="icon-salvar-page" /></div><div><span className="bnt-text-page">trailer</span></div></button>
  </div>
        <span className="subtitulo">{filme.overview}</span>
   

       
        <div className="generosid">
          
          <div className="generos">
            {filme.genres.map((e) => {
              return (
                <div className="nameGenere" key={e.id}>
                  {e.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="titulosSeme2">
          <span>Titulos Semelhantes</span>
        </div>

        <Slider  {...settings}>
          {genes.slice(0, 10).map((e) => {
            return (
              <article  key={e.id}>
                <Link to={`/filme/${e.id}`}>
                  <img
                    className="imagem"
                    alt={e.title}
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </Link>
              </article>
            );
          })}
        </Slider>

      </div>
      <MenuMobile />
    </div>
  );
}
export default Filme;