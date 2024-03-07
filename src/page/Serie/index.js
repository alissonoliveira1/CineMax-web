import { useState, useEffect } from "react";
import { Await } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css";
import api from "../../services/";
import axios from "axios";
import Header from "../../components/header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuMobile from "../../components/MenuMobile";
import { ReactComponent as Left } from "../home/icon/left.svg";
import { ReactComponent as Right } from "../home/icon/right.svg";
function Serie() {
  const [Serie, setserie] = useState([]);
  const [SerieAnime, setserieAnime] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("discover/tv?", {
          params: {
            api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            language: "pt-br",
            page: 1,
            with_genres: 16,
          },
        });
        setserie(response.data.results);
      } catch (error) {
        console.log("erro");
      }
    };
    fetchData();

    const fetchData2 = async () => {
      try {
        const response2 = await api.get("discover/tv?", {
          params: {
            api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            language: "pt-br",
            page: 1,
            with_genres: 10759,
          },
        });
        setserieAnime(response2.data.results);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData2();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
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
    <div>
      <Header/>
    <div className="container3">
      
      <div className="TituloPag">
        <span>Series</span>
      </div>
      <div className="tituloCat">
        <span>Serie de animação</span>
      </div>
      <Slider className="slides1" {...settings}>
        {Serie.map((item) => {
          return (
            <div className="capa-Filme" key={item.id}>
              <Link to={`/SeriePage/${item.id}`}>
                <img
                  className="imagem"
                  src={`https://image.tmdb.org/t/p//original/${item.poster_path}`}
                />
              </Link>
            </div>
          );
        })}
      </Slider>
      <div className="tituloCat">
        <span>Serie de animação</span>
      </div>
      <Slider className="slides1" {...settings}>
        {SerieAnime.map((item) => {
          return (
            <div className="capa-Filme" key={item.id}>
              <Link to={`/SeriePage/${item.id}`}>
                <img
                  className="imagem"
                  src={`https://image.tmdb.org/t/p//original/${item.poster_path}`}
                />
              </Link>
            </div>
          );
        })}
      </Slider>
      
    </div>
    <MenuMobile/>
    </div>
  );
}
export default Serie;
