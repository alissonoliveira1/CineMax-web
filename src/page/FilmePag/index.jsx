import { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import api from "../../services";
import "./style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import MenuSuspenso from "../../components/MenuSuspenso";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as Left } from "../../assets/icons/left.svg";
import { ReactComponent as Right } from "../../assets/icons/right.svg";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import ApresentaçãoMobile from "../../components/apresentaçãoMobile";
import Desktop from "../../components/apresentaçãoDesktop";
function FilmePag() {
  const [desc, setdesc] = useState([]);
  const [acao, setacao] = useState([]);
  const [load, setload] = useState(true);
  const [horror, sethorror] = useState([]);
  const [comedia, setcomedia] = useState([]);
  const [animation, setanimation] = useState([]);
  const [fantasia, setfantasia] = useState([]);
  const [romance, setromance] = useState([]);
 
  const {apiKey} = useContext(UserContext);
 
 
  const [poster, setPoster] = useState("");


  let dataAtual = new Date();
  let ano = dataAtual.getFullYear().toString();
  let mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
  let dia = ("0" + dataAtual.getDate()).slice(-2);
  let dataCompleta = `${ano}-${mes}-${dia}`;

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



useEffect(() => {
  const data = async () => {

    try{
      const dados4 = await api.get("discover/movie", {
        params: {
          api_key: apiKey,
          with_genres:'9648, 27',
          "primary_release_date.lte": dataCompleta,
          language: "pt-br",
          page: 1,
        },
      });
      setload(false);
      sethorror(dados4.data.results);
    }catch(error){

    }
  }
  data()
},[ dataCompleta, apiKey])

useEffect(() => {
  const data = async () => {

    try{
      const dados2 = await api.get("discover/movie", {
        params: {
          api_key: apiKey,
          "primary_release_date.lte": dataCompleta,
          with_genres: "12,28",
          language: "pt-br",
          page: 1,
        },
      });

      setacao(dados2.data.results);
    }catch(error){

    }
  }
  data()
},[ dataCompleta, apiKey])


useEffect(() => {
  const data = async () => {

    try{
      const dados8 = await api.get("discover/movie", {
        params: {
          api_key: apiKey,
          with_genres: "10749,18",
          "primary_release_date.lte": dataCompleta,
          language: "pt-br",
          page: 1,
        },
      });
      setromance(dados8.data.results);
    }catch(error){

    }
  }
  data()
},[ dataCompleta, apiKey])



useEffect(() => {
  const data = async () => {

    try{
      const dados6 = await api.get("discover/movie", {
        params: {
          api_key: apiKey,
          "primary_release_date.lte": dataCompleta,
          with_genres: 35,
          language: "pt-br",
          page: 1,
        },
      });
      setcomedia(dados6.data.results);
    }catch(error){

    }
  }
  data()
},[ dataCompleta, apiKey])




useEffect(() => {
  const data = async () => {

    try{
      const dados7 = await api.get("discover/movie", {
        params: {
          api_key: apiKey,
          with_genres: 18,
          "primary_release_date.lte": dataCompleta,
          language: "pt-br",
          page: 1,
        },
      });
      setanimation(dados7.data.results);
    }catch(error){

    }
  }
  data()
},[ dataCompleta, apiKey,])




















useEffect(() => {
  const data = async () => {

    try{
      const dados5 = await api.get("discover/movie", {
        params: {
          api_key: apiKey,
          with_genres: "14, 878",
          "primary_release_date.lte": dataCompleta,
          language: "pt-br",
          page: 1,
        },
      });
      setfantasia(dados5.data.results);
    }catch(error){

    }
  }
  data()
},[ dataCompleta, apiKey])











  useEffect(() => {
    const data = async () => {
      try {
        const dados = await api.get("discover/movie", {
          params: {
            api_key: apiKey,
            with_genres: 16,
            "primary_release_date.lte": dataCompleta,
            language: "pt-br",
            page: 1,
          },
        });
        setdesc(dados.data.results);

        

        
      } catch (erro) {
        console.log(erro + "filme não encontrado");
      }
    };
    data();
  }, [  dataCompleta, apiKey]);






  if (load) {
    return (
      <div className="load">
        <div className="loadd"></div>
      </div>
    );
  }
 
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

  return (
    <div className="listaPaiFilmes">
      <Header />
      <MenuSuspenso/>
      <div className="slide">
        <div className="ConjuntoSlide">

  {poster === "poster_path" &&(
              <ApresentaçãoMobile/>
            )}
             {poster === "backdrop_path" &&(
              <Desktop/>
            )}

        </div>
    
      </div>
      <div className="tituloCat">
        <span>Filmes</span>
      </div>

      <div className="tituloCat">
        <span>Descubra seu novo filme favorito</span>
      </div>
      <Slider {...settings}>
        {desc.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/filme/${e.id}`}>
                <div>
                  <img
                    className="imagem"
                    alt="filme-capa"
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
      <div className="tituloCat">
        <span>Filmes de ficção científica e fantasia</span>
      </div>
      <Slider {...settings}>
        {fantasia.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/filme/${e.id}`}>
                <div>
                  <img
                    className="imagem"
                    alt="capa-filme"
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
      <div className="tituloCat">
        <span>Filmes de Ação e Aventura</span>
      </div>
      <Slider {...settings}>
        {acao.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/filme/${e.id}`}>
                <div>
                  <img
                    className="imagem"
                    alt="capa-filme"
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
      <div className="tituloCat">
        <span>Animação</span>
      </div>
      <Slider {...settings}>
        {animation.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/filme/${e.id}`}>
                <div>
                  <img
                    className="imagem"
                    alt="capa-filme"
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
      <div className="tituloCat">
        <span>Filmes de comedia</span>
      </div>
      <Slider {...settings}>
        {comedia.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/filme/${e.id}`}>
                <div>
                  <img
                    className="imagem"
                    alt="capa-filme"
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
      <div className="tituloCat">
        <span>romance</span>
      </div>
      <Slider {...settings}>
        {romance.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/filme/${e.id}`}>
                <div>
                  <img
                    className="imagem"
                    alt="capa-filme"
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
      <div className="tituloCat">
        <span>Filmes de Suspense e terror</span>
      </div>

      <Slider {...settings}>
        {horror.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/filme/${e.id}`}>
                <div>
                  <img
                    className="imagem"
                    alt="capa-filme"
                    src={`https://image.tmdb.org/t/p//original/${e.poster_path}`}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
      <MenuMobile />
    </div>
  );
}
export default FilmePag;
