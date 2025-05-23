import { useEffect, useState,useContext } from "react";
import { UserContext } from "../../contexts/user";
import Slider from "react-slick";
import api from "../../services";
import { Link } from "react-router-dom";
import { ReactComponent as Left } from "../../assets/icons/left.svg";
import { ReactComponent as Right } from "../../assets/icons/right.svg";
import './style.css'
function ContDestaque({genero}){
    const { apiKey } = useContext(UserContext);
    const [filmesPorGenero, setFilmesPorGenero] = useState([]);

    let dataAtual = new Date();
    let ano = dataAtual.getFullYear().toString();
    let mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
    let dia = ("0" + dataAtual.getDate()).slice(-2);
    let dataCompleta = `${ano}-${mes}-${dia}`;

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
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get("/discover/movie", {
              params: {
                api_key: process.env.REACT_APP_FIREBASE_API_KEY,
                with_genres: genero,
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
      }, [dataCompleta,apiKey,genero]);
return(
    <Slider className="SlideD" {...settings}>
    {filmesPorGenero.slice().map((filme) => {
      return (
        <article  key={filme.id}>
          <Link className="botaoD" to={`/filme/${filme.id}`}>
            <div>
              <img
                className="imagemD"
                alt={filme.title}

                src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}
              />
            </div>
          </Link>
        </article>
      );
    })}
  </Slider>
)
}
export default ContDestaque;