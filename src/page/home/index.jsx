import { useEffect, useState, useContext } from "react";
import api from "../../services";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ReactComponent as Left } from "./icon/left.svg";
import { ReactComponent as Right } from "./icon/right.svg";
import "./style.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import { UserContext } from "../../contexts/user";
import { auth } from "../../firebaseConnect";
import MenuSuspenso from "../../components/MenuSuspenso";
import ApresentaçãoMobile from "../../components/apresentaçãoMobile";
import Desktop from "../../components/apresentaçãoDesktop";
//movie/now_playing?api_key=9f4ef628222f7685f32fc1a8eecaae0b&language=pt-br

function Home() {
  const [Filmes, setFilmes] = useState([]);
  const [load, setLoad] = useState(true);
  const [filmesPorGenero2, setFilmesPorGenero2] = useState([]);
  const [filmesPorGenero, setFilmesPorGenero] = useState([]);
  const [animaFilmes, setAnimaFilmes] = useState([]);
  
  const generoId = 28;

  const anima2 = 16;
  const { authStatus } = useContext(UserContext);
  const { apiKey } = useContext(UserContext);
  const [series, setseries] = useState([]);
  const [poster, setPoster] = useState("");
  
  useEffect(() => {
    if (auth) {
      if (authStatus === false) {
        toast.warn("verifique seu email!");
      }

      
    }
    
  },[authStatus]);


  let dataAtual = new Date();
  let ano = dataAtual.getFullYear().toString();
  let mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
  let dia = ("0" + dataAtual.getDate()).slice(-2);
  let dataCompleta = `${ano}-${mes}-${dia}`;

  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("discover/tv", {
          params: {
            api_key: apiKey,
            language: "pt-BR",
           
          },
        });

        setseries(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
      
    };
    fetchData();
  }, [dataCompleta,apiKey]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("movie/now_playing", {
          params: {
            api_key: apiKey,
            language: "pt-BR",
            "primary_release_date.lte": dataCompleta,
            page: 1,
          },
        });

        setFilmes(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };


    fetchData();
   
  }, [dataCompleta,apiKey]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/discover/movie", {
          params: {
            api_key: apiKey,
            with_genres: generoId,
            language: "pt-br",
            "primary_release_date.lte": dataCompleta,
            page: 1,
          },
        });

        setFilmesPorGenero(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [dataCompleta,apiKey]);

  useEffect(() => {
    const animation = async () => {
      try {
        const response2 = await api.get("/discover/movie", {
          params: {
            with_genres: anima2,
            api_key: apiKey,
            language: "pt-BR",
            "primary_release_date.lte": dataCompleta,
            page: 1,
          },
        });
        setFilmesPorGenero2(response2.data.results);
      } catch (error) {
        console.log("Erro ao buscar dados da API:", error);
      }
    };
    animation();
  },[dataCompleta, apiKey]);

  useEffect(() => {
    const terror = async () => {
      try {
        const response2 = await api.get("search/multi", {
          params: {
            query: "marvel",
            api_key: apiKey,
            language: "pt-BR",
            "primary_release_date.lte": dataCompleta,
            page: 3,
          },
        });
        setAnimaFilmes(response2.data.results);
        setLoad(false);

      } catch (error) {
        console.log("Erro ao buscar dados da API:", error);
      }
    };
    terror();
  },[dataCompleta,apiKey]);
  
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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    variableWidth: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          variableWidth: true,
          slidesToShow: 3,
          infinite: true,
          slidesToScroll: 4,
        },
      },
    ],
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
 
  return (
    <div className="container2">
      <Header />
      <MenuMobile />
      <MenuSuspenso/>
      <div className="slide">
        <div className="ConjuntoSlide">
         
         
            {poster === "poster_path" &&(
              <ApresentaçãoMobile/>
            )}
             {poster === "backdrop_path" &&(
              <div className="cataaz">
                <Desktop/>
                
              </div>
              

              
            )}
            
            
            
       
        </div>
      </div>

      <div className="listaPaiFilmes">
        <div className="tituloCat">
          <span>Em alta</span>
        </div>
        <div >
          <Slider className="slides01"  {...settings}>
            {Filmes.map((filmes) => {
              return (
                <article  key={filmes.id}>
                  <Link to={`/filme/${filmes.id}`}>
                    <img
                      className="imagem"
                      alt={filmes.title}
                      src={`https://image.tmdb.org/t/p//original/${filmes.poster_path}`}
                    />
                  </Link>
                </article>
              );
            })}
          </Slider>
        </div>

        <div className="tituloCat">
          <span>Filmes de Ação</span>
        </div>

        <Slider {...settings}>
          {filmesPorGenero.slice().map((filme) => {
            return (
              <article  key={filme.id}>
                <Link className="botao" to={`/filme/${filme.id}`}>
                  <div>
                    <img
                      className="imagem"
                      alt={filme.title}
                      src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}
                    />
                  </div>
                </Link>
              </article>
            );
          })}
        </Slider>
        <div className="tituloCat">
          <span>Animação</span>
        </div>

        <Slider {...settings}>
          {filmesPorGenero2.slice().map((filme) => {
            return (
              <article className="capa-Filme" key={filme.id}>
                <Link className="botao" to={`/filme/${filme.id}`}>
                  <div>
                    <img
                      className="imagem"
                      alt={filme.title}
                      src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}
                    />
                  </div>
                </Link>
              </article>
            );
          })}
        </Slider>

        <div className="tituloCat">
          <span>Filmes de terror</span>
        </div>
        <Slider {...settings}>
          {animaFilmes.slice().map((filme) => {
            return (
              <article className="capa-Filme" key={filme.id}>
                <Link className="botao" to={`/filme/${filme.id}`}>
                  <img
                    className="imagem"
                    alt={filme.title}
                    src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}
                  />
                </Link>
              </article>
            );
          })}
        </Slider>

        <div className="tituloCat">
          <span>Filmes de talkshow</span>
        </div>
        <Slider {...settings}>
          {series.slice().map((filme) => {
            return (
              <article className="capa-Filme" key={filme.id}>
                <Link className="botao" to={`/SeriePage/${filme.id}`}>
                  <img
                    className="imagem"
                    alt={filme.title}
                    src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}
                  />
                </Link>
              </article>
            );
          })}
        </Slider>
      </div>
      
    </div>
  );
}
export default Home;
