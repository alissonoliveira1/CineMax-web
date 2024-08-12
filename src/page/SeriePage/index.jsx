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
  const [selectedSeason, setSelectedSeason] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const { user, apiKey } = useContext(UserContext);
  const textToShare = `https://cinemg.netlify.app/tv/${id}`;
  const isFavorito = favoritos.includes(filme.id);
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
              api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
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
    console.log(seasons);
  }, [id, seasons]);

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
  const salvarfilme = async () => {
    try {
      const documentoRef = doc(db, "cineData", user.uid);

      if (isFavorito) {
        await updateDoc(documentoRef, {
          favorito: arrayRemove({ id: filme.id, ...filme }),
        });
        console.log("Filme removido dos favoritos:", filme.id);
      } else {
        await updateDoc(documentoRef, {
          favorito: arrayUnion({ id: filme.id, ...filme }),
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
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(textToShare);
      toast.success("Texto copiado para a área de transferência!");
    } catch (err) {
      console.error("Erro ao copiar texto: ", err);
      toast.error("Erro ao copiar texto.");
    }
  };
  if (load) {
    return <div className="detalhes">Carregando detalhes...</div>;
  }

  return (
    <div key={filme.id}>
      <Header />
      <MenuSuspenso />
      <div className="conjunto">
        <img
          className="capa"
          alt={filme.name}
          src={`https://image.tmdb.org/t/p//original/${filme.backdrop_path}`}
        />
      </div>
      <div className="mobile-scroll">
      <div className="info">
        <h1 className="tituloFilme">{filme.name}</h1>
        <div className="buttons">
          <button onClick={salvarfilme} className="bnt-page-infos">
            <span>
              {isFavorito ? (
                <div className="icon-name-page">
                  <HeartB className="icon-salvar-page" />
                  <div><span className="bnt-text-page">salvo</span></div>
                </div>
              ) : (
                <div className="icon-name-page">
                  <HeartA className="icon-salvar-page" />
                  <div><span className="bnt-text-page">salvar</span></div>
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
        <span className="subtitulo">{filme.overview}</span>
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
          <h2>Episodios</h2>
        </div>

        <ul className="paiEps">
          {episodes.map((episode) => (
            <Link
              to={`/Play/${filme.id}/${episode.season_number}/${episode.episode_number}`}
            >
              <li className="listaEps" key={episode.id}>
                <img
                  className="imagemSerie"
                  alt="capa-epsode"
                  src={`https://image.tmdb.org/t/p//original/${episode.still_path}`}
                />
                <div>
                  <div className="pai_ep_time">
                    <span className="nomeEps">{episode.episode_number}. {episode.name}</span>
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
      <div></div>
      <MenuMobile />
    </div>
  );
}
export default SeriePage;
