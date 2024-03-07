import { Await } from "react-router-dom";
import Filme from "../filme";
import { useEffect, useState } from "react";
import api from "../../services/";
import { Link } from "react-router-dom";
import { ReactComponent as Left } from "./icon/left.svg";
import { ReactComponent as Right } from "./icon/right.svg";
import "./style.css";
import { Slide } from "react-toastify";
import axios from "axios";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";


//movie/now_playing?api_key=9f4ef628222f7685f32fc1a8eecaae0b&language=pt-br

function Home() {
  const [Filmes, setFilmes] = useState([]);
  const [load, setLoad] = useState(true);
  const [resumo, setresumo] = useState("");
  const genero = 28;
  const [filmesPorGenero, setFilmesPorGenero] = useState([]);
  const [filmesPorGenero2, setFilmesPorGenero2] = useState([]);
  const [animaFilmes, setAnimaFilmes] = useState([]);
  const apiKey = "9f4ef628222f7685f32fc1a8eecaae0b";
  const generoId = 28;
  const anima = 27;
  const anima2 = 16;
  const [filmeAleatorio, setFilmeAleatorio] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=9f4ef628222f7685f32fc1a8eecaae0b&with_genres=${generoId}&language=pt-br`
        );
        const response2 = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=9f4ef628222f7685f32fc1a8eecaae0b&with_genres=${anima}&language=pt-br`
        );
        const response3 = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=9f4ef628222f7685f32fc1a8eecaae0b&with_genres=${anima2}&language=pt-br`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data2 = await response2.json();
        const data = await response.json();
        const data3 = await response3.json()
        setFilmesPorGenero(data.results);
        setAnimaFilmes(data2.results); 
        setFilmesPorGenero2(data3.results)
        setLoad(false);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [apiKey, generoId, anima]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("movie/now_playing", {
          params: {
            api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            language: "pt-BR",
            page: 1,
          },
        });

        
        setFilmes(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    const obterFilmeAleatorio = async () => {
      try {
        const resposta = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
              sort_by: "popularity.desc",
              language: "pt-BR",
              page: Math.floor(Math.random() * 100) + 1,
            },
          }
        );

        const { results } = resposta.data;
        if (results && results.length > 0) {
          const filmeAleatorio = results[0];
          setFilmeAleatorio(filmeAleatorio);
        } else {
          console.error("Nenhum filme aleatório encontrado.");
        }
      } catch (erro) {
        console.error("Erro ao obter filme aleatório:", erro);
      }
    };

    fetchData();
    obterFilmeAleatorio();
  }, []); 
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldScroll = scrollTop > 50;

      setIsScrolled(shouldScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const settings = {
    className: "Sliders2",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    variableWidth: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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

  return (
    <div className="container2">
      <Header/>
      <div className="slide">
        <div className="ConjuntoSlide">
          <div className="textoConjuntoSlide">
            <div className="tituloSlide">
              <div>{filmeAleatorio.title}</div>
            </div>
            <div className="resumoSlide">{filmeAleatorio.overview}</div>
            <div className="botoesSlide">
              <div>
                <a href={`https://superflixapi.top/filme/${filmeAleatorio.id}`}>
                  <button className="assistirSlide">Assisir</button>
                </a>
              </div>
              <div>
                <Link to={`/filme/${filmeAleatorio.id}`}>
                  <button className="verSlide">Ver Mais</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="imgSlideDiv">
            <img
              className="imgSlide"
              src={`https://image.tmdb.org/t/p//original/${filmeAleatorio.backdrop_path}`}
            />
            <div className="sombra"></div>
          </div>
        </div>
      </div>

      <div className="listaPaiFilmes">
        <div className="tituloCat">
          <span>Em alta</span>
        </div>
<div className="slide3">
        <Slider className="slides1" {...settings}>
          {Filmes.map((filmes) => {
            return (
              <article className="capa-Filme" key={filmes.id}>
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

        <Slider className="slides1" {...settings}>
          {filmesPorGenero.slice().map((filme) => {
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
          <span>Animação</span>
        </div>

        <Slider className="slides1" {...settings}>
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
        <Slider className="slides1" {...settings}>
          {animaFilmes.slice().map((filme) => {
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
      </div>
    <MenuMobile/>
    </div>
  );
}
export default Home;
