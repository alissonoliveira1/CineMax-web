import Home from "../home";
import "./style.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services";
import { toast } from "react-toastify";
import { ReactComponent as Core } from "../filme/icon/heart.svg";
import { ReactComponent as Play } from "../filme/icon/play-fill.svg";
import axios from "axios";
import { db } from "../../firebaseConnect";
import { doc, addDoc, collection } from "firebase/firestore";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";




function Filme() {

  const [rating, setTeste] = useState([]);
  const [genes, setgenes] = useState([]);
  const [certificacao, setCertificacao] = useState("");
  const [erro, setErro] = useState("");
  const [genes2, setgenes2] = useState();
  const { id } = useParams();
  const navegate = useNavigate();
  const [load, setload] = useState(true);
  const [filme, setfilme] = useState([]);
  const [semelhantes, setsemelhantes] = useState([]);
  const genreIds = filme.genres ? filme.genres.map((genre) => genre.id) : [];
  const [user, settuser] = useState({});
  const [user2, settuser2] = useState({});
  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            language: "pt-BR",
            append_to_response: "release_dates",
          },
        })

        .then((response) => {
          setfilme(response.data);
          settuser2(response.data)
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
    const semes = async () => {
      try {
        const datas = await api.get("discover/movie", {
          params: {
            api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            language: "pt-BR",
            with_genres: await genreIds.join(","),
          },
        });
        setgenes(datas.data.results);
      } catch (error) {
        console.log("filme genero nao encontrado");
      }
    };
    semes();
  }, [genreIds]);

  useEffect(() => {
    async function buscarCertificacao() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/release_dates`,
          {
            params: {
              api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            },
          }
        );
        
        const { results } = response.data;
        const certificacoes = results.find(
          (result) => result.iso_3166_1 === "BR"
        ); // Aqui estamos buscando a certificação para o Brasil

        if (certificacoes) {
          const certificacaoEncontrada = certificacoes.release_dates.find(
            (date) => date.certification !== ""
          );
          if (certificacaoEncontrada) {
            setCertificacao(certificacaoEncontrada.certification);
          }
        }
      } catch (error) {
        setErro("Erro ao buscar a classificação indicativa.");
      }
    }

    buscarCertificacao();
  }, []);

  const releaseYear = filme.release_date
    ? filme.release_date.substring(0, 4)
    : "";
  const durationInMinutes = filme.runtime || 0;

  // Calcula as horas e minutos
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;



   useEffect(()=>{
    async function dados(){
      const userdatalhes = localStorage.getItem("@usuario");
      settuser(JSON.parse(userdatalhes));
    }
    dados()
   },[])
 async function salvarfilme() {
 
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

    toast.success("Filme salvo com sucesso!");
    await addDoc(collection(db,"cineData"),{
      userUid: user?.uid,
      favorito: user2
      
    })
    .then(() => {
      console.log("registrado");
     
    })
  
    .catch((error) => {
      console.log("error ao registrar" + error);
    });
  }

  if (load) {
    return (
      <div className="load">
        <div className="loadd"></div>
      </div>
    );
  }

  //e.release_dates.map((e)=>{return <div>{e.certification}</div>}
  return (
    <div className="filme_info2">
      <Header/>
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
                <div className="BoxI"> Classificação Indisponivel</div>
              )}
            </div>
            <h3 className="data">
              {releaseYear} {hours}hrs {minutes}min
            </h3>
          </div>{" "}
        </div>

        <h3 className="sinopse">
          <strong>Sinopse</strong>
        </h3>

        <span className="subtitulo">{filme.overview}</span>
        <div className="generosid">
          <span>Generos:</span>{" "}
          <div className="generos">
            {filme.genres.map((e) => {
              return (
                <div className="nameGenere" key={e.id}>
                  {e.name},{" "}
                </div>
              );
            })}
          </div>
        </div>

        <div className="buttons">
          <a
            target="blank"
            rel="external"
            href={`https://superflixapi.top/filme/${filme.imdb_id}`}
          >
            <button className="trailer">
              <Play className="playFilme" />
            </button>
          </a>
          <button onClick={salvarfilme} className="salvar">
            <Core className="salvarFilme" />
          </button>
        </div>

        <div className="titulosSeme2">
          <span>Titulos Semelhantes</span>
        </div>
        <div className="FilmePaiSg">
          {genes.slice(0, 10).map((e) => {
            return (
              <div className="loucura" key={e.id}>
                <Link to={`/filme/${e.id}`}>
                  <img
                    className="imagemFilmes"
                    alt={e.title}
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <MenuMobile/>
    </div>
  );
}
export default Filme;
