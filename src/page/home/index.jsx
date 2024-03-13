
import { useEffect, useState } from "react";
import api from "../../services";
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
//movie/now_playing?api_key=9f4ef628222f7685f32fc1a8eecaae0b&language=pt-br

function Home() {
  const [Filmes, setFilmes] = useState([]);
  const [load, setLoad] = useState(true);
  const [filmesPorGenero2, setFilmesPorGenero2] = useState([]);
  const [filmesPorGenero, setFilmesPorGenero] = useState([]);
  const [filmeAleatorio, setFilmeAleatorio] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animaFilmes, setAnimaFilmes] = useState([]);
  const apiKey = "9f4ef628222f7685f32fc1a8eecaae0b";
  const generoId = 28;
  const acion = 27;
  const anima2 = 16;
  
  
  let dataAtual = new Date();
  let ano = dataAtual.getFullYear().toString();
  let mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2); 
  let dia = ('0' + dataAtual.getDate()).slice(-2); 
  let dataCompleta = `${ano}-${mes}-${dia}`;
  

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

const [series,setseries] = useState([])

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
    fetchData()
  }})


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("movie/now_playing", {
          params: {
            api_key: apiKey,
            language: "pt-BR",
            'primary_release_date.lte': dataCompleta,
            page: 1,
            
          },
        });
        const response2 = await api.get("", {
          params: {
            api_key: apiKey,
            with_genres: 28, 
           
            
            
          },
        });
        setseries(response2.data.results);
        
        setFilmes(response.data.results);

      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    const obterFilmeAleatorio = async () => {
      try {
        const resposta = await api.get("/discover/movie",{
            params: {
              api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
              sort_by: "popularity.desc",
              language: "pt-BR",
              'primary_release_date.lte': dataCompleta,
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/discover/movie",{
          params:{
            api_key:apiKey,
            with_genres:generoId,
            language:"pt-br",
            'primary_release_date.lte': dataCompleta,
            page: 1
          }
        })
         
        setFilmesPorGenero(response.data.results);

      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);


 

  
useEffect(()=>{
  const animation = async ()=>{
try{
  const response2 = await api.get("/discover/movie",{
 params:{
  with_genres:anima2,
  api_key: apiKey,
  language: "pt-BR",
  'primary_release_date.lte': dataCompleta,
  page: 1
 }
  })
  setFilmesPorGenero2(response2.data.results);
}catch (error) {
  console.log("Erro ao buscar dados da API:", error);
}
  }
  animation()
})

useEffect(()=>{
  const terror = async ()=>{
try{
  const response2 = await api.get("/discover/movie",{
 params:{
  with_genres:acion,
  api_key: apiKey,
  language: "pt-BR",
  'primary_release_date.lte': dataCompleta,
  page: 1
 }
  })
  setAnimaFilmes(response2.data.results)
  setLoad(false);
}catch (error) {
  console.log("Erro ao buscar dados da API:", error);
}
  }
  terror()
})


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
          centerMode: false,
          slidesToShow: 3,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
          slidesToScroll: 3,
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
      <div className="slide">
        <div className="ConjuntoSlide">
          <div className="textoConjuntoSlide">
            <div className="tituloSlide">
              <div>{filmeAleatorio.title}</div>
            </div>
            <div className="resumoSlide">{filmeAleatorio.overview}</div>
            <div className="botoesSlide">
              <div>
                <Link to={`/FilmePlay/${filmeAleatorio.id}`}>
                  <button className="assistirSlide">Assisir</button>
                </Link>
                  
              </div>
              <div>
                <Link to={`/filme/${filmeAleatorio.id}`}>
                  <button className="verSlide">Ver Mais</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="imgSlideDiv">
            <div className="sombra"></div>
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
            {series.map((filmes) => {
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

        <Slider className="slides11" {...settings}>
          {filmesPorGenero.slice().map((filme) => {
            return (
              <article className="capa-Filme2" key={filme.id}>
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
      <MenuMobile />
    </div>
  );
}
export default Home;
