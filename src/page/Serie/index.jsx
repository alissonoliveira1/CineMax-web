import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import MenuSuspenso from "../../components/MenuSuspenso";
import api from "../../services";
import Header from "../../components/header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuMobile from "../../components/MenuMobile";
import { ReactComponent as Left } from "../home/icon/left.svg";
import { ReactComponent as Right } from "../home/icon/right.svg";
import ApresentacaoMobile from "../../components/apresentaçãoMobile";
import Desktop from "../../components/apresentaçãoDesktop";
function Serie() {
  const [poster, setPoster] = useState("");
  const [serie, setserie] = useState([]);
  const [serieAnime, setserieAnime] = useState([]);
  const apiKey = '9f4ef628222f7685f32fc1a8eecaae0b'

  
        
    
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("discover/tv", {
          params: {
            api_key: apiKey,
            with_genres: 16, 
            language: "pt-br",
            page: 1
          }
        });
        
        setserie(response.data.results);
        
      
      } 
      catch(erro) {
        console.log(erro);
      }
    };
    fetchData();

  }, [ apiKey ]);

  useEffect(()=>{
    const fetchData2 = async () => {
      try {
        const response2 = await api.get("discover/tv?", {
          params: {
            api_key: apiKey,
            with_genres: 10759,
  
            language: "pt-br",
            page: 1,
          },
        });
        setserieAnime(response2.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData2();
  },[apiKey])
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


 


  return (
    <div className="container2">
      <Header/>
      <MenuSuspenso/>

      <div className="slide">
        <div className="ConjuntoSlide">
         
         
            {poster === "poster_path" &&(
              <ApresentacaoMobile/>
            )}
             {poster === "backdrop_path" &&(
              <div className="cataaz">
                <Desktop/>
                
              </div>
              

              
            )}
            
            
            
       
        </div>
      </div>
    <div className="listaPaiFilmes">

      <div className="TituloPag">
        <span>Series</span>
      </div>
      <div className="tituloCat">
        <span>Serie de animação</span>
      </div>
      <Slider  {...settings}>
        {serie.map((item) => {
          return (
            <article  key={item.id}>
              <Link to={`/SeriePage/${item.id}`}>
                <img
                alt="capa-serie"
                  className="imagem"
                  src={`https://image.tmdb.org/t/p//original/${item.poster_path}`}
                />
              </Link>
            </article>
          );
        })}
      </Slider>
      <div className="tituloCat">
        <span>Serie de animação</span>
      </div>
      <Slider  {...settings}>
        {serieAnime.map((item) => {
          return (
            <article  key={item.id}>
              <Link to={`/SeriePage/${item.id}`}>
                <img
                alt="capa-serie"
                  className="imagem"
                  src={`https://image.tmdb.org/t/p//original/${item.poster_path}`}
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
export default Serie;
