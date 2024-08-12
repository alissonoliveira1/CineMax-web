import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../../services";
import "./style.css";
import { toast } from "react-toastify";
import MenuSuspenso from "../../components/MenuSuspenso";
import { ReactComponent as Camera } from "./icon/camera-reels.svg";
import { ReactComponent as HeartA } from "../../components/apresentaçãoMobile/icon/heart.svg";
import { ReactComponent as HeartB } from "../../components/apresentaçãoMobile/icon/heart-fill.svg";
import { ReactComponent as Share } from "./icon/share.svg";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConnect";
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
  getDoc,
} from "firebase/firestore";
function SeriePage() {
  const { id } = useParams();
  const navegate = useNavigate();
  const [load, setload] = useState(true);
  const [filme, setfilme] = useState([]);
  const [logo, setLogo] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const { user, apiKey } = useContext(UserContext);
  const [certificacao, setCertificacao] = useState("");
  const textToShare = `https://cinemg.netlify.app/tv/${id}`;
  const [poster, setPoster] = useState("");
  const isFavorito = favoritos.includes(filme.id);
  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/tv/${id}`, {
          params: {
            api_key: apiKey,
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
  }, [navegate, id, apiKey]);

  const [seasons, setSeasons] = useState([]);
  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);
    setSeasons(selectedSeason);
  };
  useEffect(() => {
    async function loadEpisodes() {
      try {
        const response = await api.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${
            seasons.length === 0 ? "1" : seasons
          }`,
          {
            params: {
              api_key: apiKey,
              language: "pt-br",
            },
          }
        );
        setEpisodes(response.data.episodes);
      } catch (error) {
        console.error("Erro ao carregar os episódios:", error);
      }
    }
    loadEpisodes();
   
  }, [id, seasons, apiKey]);
  useEffect(() => {
    async function fetchLogo() {
      try {
        const response = await api.get(`/tv/${id}/images`, {
          params: {
            api_key: apiKey,
            language: "pt",
          },
        });

        const logos = response.data.logos;

        if (logos && logos.length > 0) {
          setLogo(logos[0].file_path);
        }
      } catch (error) {
      
      }
    }

    fetchLogo();
  }, [ apiKey,id]);
  useEffect(() => {
    async function fetchFavoritos() {
      if (user) {
        const tarefaRef = collection(db, "cineData");
        const q = query(tarefaRef, where("userUid", "==", user.uid));

        onSnapshot(q, (snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            const data = doc.data().favorito || [];
            lista = [...lista, ...data.map((fav) => fav.id)];
          });
          setFavoritos(lista);
        });
      }
    }

    fetchFavoritos();
  }, [user]);
  const releaseYear = filme.first_air_date
    ? filme.first_air_date.substring(0, 4)
    : "";
  useEffect(() => {
    async function buscarCertificacao() {
      try {
        const response = await api.get(`/tv/${id}/content_ratings`, {
          params: {
            api_key: apiKey,
          },
        });

        const { results } = response.data;
        const certificacoes = results.find(
          (result) => result.iso_3166_1 === "BR"
        );

        if (certificacoes) {
          if (certificacoes.rating) {
            setCertificacao(certificacoes.rating);
          }
        }
      } catch (error) {
  
      }
    }

    buscarCertificacao();
  }, [id, apiKey]);

 
  const salvarfilme = async () => {
    try {
      const documentoRef = doc(db, "cineData", user.uid);

      if (isFavorito) {
        await updateDoc(documentoRef, {
          favorito: arrayRemove({ id: filme.id, ...filme }),
        });
 
      } else {
        await updateDoc(documentoRef, {
          favorito: arrayUnion({ id: filme.id, ...filme }),
        });
     
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
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(textToShare);
      toast.success("Texto copiado para a área de transferência!");
    } catch (err) {
      console.error("Erro ao copiar texto: ", err);
      toast.error("Erro ao copiar texto.");
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
    tela480.addEventListener("change", handleResize);

    return () => tela480.removeEventListener("change", handleResize);
  }, []);
  if (load) {
    return <div className="detalhes">Carregando detalhes...</div>;
  }

  return (
    <div key={filme.id}>
      <Header />
      <MenuSuspenso />
      <div className="conjunto">
        {poster === "poster_path" && (
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
        {poster === "backdrop_path" && (
          <img
            className="capa"
            alt={filme.title}
            src={`https://image.tmdb.org/t/p//original/${filme.backdrop_path}`}
          />
        )}
      </div>
      <div className="mobile-scrollSerie">
        <div className="infoSerie">
          <div className="conjunto-titulo-play">
            {logo ? (
              <div className="div-title-img-desk2">
                <img
                  className="title-film-desk2"
                  alt={filme.title}
                  src={`https://image.tmdb.org/t/p/original/${logo}`}
                />
              </div>
            ) : (
              <div className="titulo-filme">
                <span>{filme.title}</span>
              </div>
            )}
            <div className="conjuntos-bnt-genero">
              <div className="date-classf-genere">
                <div className="dateClassf">
                  <div className="idadeIndicativa">
                    {certificacao === "L" && <div className="BoxL">L</div>}
                  </div>
                  <div className="idadeIndicativa">
                    {certificacao === "12" && <div className="Box10">12</div>}
                  </div>

                  <div className="idadeIndicativa">
                    {certificacao === "14" && <div className="Box14">14</div>}
                  </div>
                  <div className="idadeIndicativa">
                    {certificacao === "16" && <div className="Box16">16</div>}
                  </div>
                  <div className="idadeIndicativa">
                    {certificacao === "18" && <div className="Box18">18</div>}
                  </div>
                  <div className="idadeIndicativa">
                    {certificacao < 1 && (
                      <div className="BoxI">Classificação Indisponivel</div>
                    )}
                  </div>
                  <div className="data">
                    <div className="temp-data-class">
                      <div className="horas-data-page"><span>{filme.number_of_seasons} temporadas</span>  <span>{releaseYear}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button onClick={salvarfilme} className="bnt-page-infos">
              <span>
                {isFavorito ? (
                  <div className="icon-name-page">
                    <HeartB className="icon-salvar-page" />
                    <div>
                      <span className="bnt-text-page">salvo</span>
                    </div>
                  </div>
                ) : (
                  <div className="icon-name-page">
                    <HeartA className="icon-salvar-page" />
                    <div>
                      <span className="bnt-text-page">salvar</span>
                    </div>
                  </div>
                )}
              </span>
            </button>
            <button className="bnt-page-infos" onClick={handleShare}>
              <div>
                <Share className="icon-salvar-page" />
              </div>
              <div>
                <span className="bnt-text-page">compartilhar</span>
              </div>
            </button>
            <button className="bnt-page-infos">
              <div>
                <Camera className="icon-salvar-page" />
              </div>
              <div>
                <span className="bnt-text-page">trailer</span>
              </div>
            </button>
          </div>
          <div><span className="subtituloSerie">{filme.overview}</span></div>
          <div className="paiSelect">
            <select
              className="selectTemp"
              value={selectedSeason}
              onChange={handleSeasonChange}
            >
              {filme.seasons.map((i) => {
                return (
                  <option value={i.season_number} key={i.id}>
                    {i.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="titleEps">
            <span>Episodios</span>
          </div>

          <ul className="paiEps">
            {episodes.map((episode) => (
              <Link
              key={episode.id}
                to={`/Play/${filme.id}/${episode.season_number}/${episode.episode_number}`}
              >
                <li className="listaEps" >
                  <img
                    className="imagemSerie"
                    alt="capa-epsode"
                    src={`https://image.tmdb.org/t/p//original/${episode.still_path}`}
                  />
                  <div>
                    <div className="pai_ep_time">
                      <span className="nomeEps">
                        {episode.episode_number}. {episode.name}
                      </span>
                      <span className="timeEps">{episode.runtime}min</span>
                    </div>
                    <div className="descEps">
                      <span>{episode.overview}</span>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div>

      </div>
      <MenuMobile />
    </div>
  );
}
export default SeriePage;
