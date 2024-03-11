
import "./style.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services";
import { toast } from "react-toastify";
import { ReactComponent as Core } from "../filme/icon/heart.svg";
import { ReactComponent as Play } from "../filme/icon/play-fill.svg"; 
import { ReactComponent as Left } from "./icon/left.svg";
import { ReactComponent as Right } from "./icon/right.svg";
import axios from "axios";
import { db } from "../../firebaseConnect";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  query,
  where,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";


function Filme() {
  const [genes, setgenes] = useState([]);
  const [certificacao, setCertificacao] = useState("");
  const [erro, setErro] = useState("");
  const { id } = useParams();
  
  const navegate = useNavigate();
  const [load, setload] = useState(true);
  const [filme, setfilme] = useState([]);
  const genreIds = filme.genres ? filme.genres.map((genre) => genre.id) : [];
  const [user, settuser] = useState({});
  const [user2, settuser2] = useState({});
  const [novo, setnovo] = useState([]);
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


  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  useEffect(() => {
    async function dadosFav() {
      const userdatalhes = localStorage.getItem("@usuario");
   

      if (userdatalhes) {
        const data = JSON.parse(userdatalhes);

        

        const tarefaRef = collection(db, "cineData");

        const q = query(
          tarefaRef,
     
          where("userUid", "==", data?.uid)
        );

        const unsub = onSnapshot(q, (Snapshot) => {

          let lista = [];
          Snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              favorito: doc.data().favorito
      
            });
            
          });
         setnovo(lista);
    
        }); 
      }
    }
    dadosFav();
  }, []);

   useEffect(()=>{
    async function dados(){
      const userdatalhes = localStorage.getItem("@usuario");
      settuser(JSON.parse(userdatalhes));
    }
    dados()
   },[])
 async function salvarfilme() {
 
  

    const hasfilme = novo.some(
      (novo) => novo.favorito.id === filme.id
    );

    if (hasfilme) {
      toast.warn("Este filme ja esta Salvo!");
      return;
    }
  

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
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
          slidesToScroll: 3
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

        <div  className="buttons">
          <Link
            to={`/FilmePlay/${filme.imdb_id}`}
          >
            <button className="trailer">
              <Play className="playFilme" />
            </button>
          </Link>
          <button onClick={salvarfilme} className="salvar">
            <Core className="salvarFilme" />
          </button>
        </div>

        <div className="titulosSeme2">
          <span>Titulos Semelhantes</span>
        </div>
      
        <Slider className="slides1" {...settings}>
          
          {genes.slice(0, 10).map((e) => {
            return (
              <article className="capa-Filme" key={e.id}>
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
      <MenuMobile/>
    </div>
  );
}
export default Filme;
