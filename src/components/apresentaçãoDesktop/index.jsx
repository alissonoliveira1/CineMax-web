
import { useState,useEffect, useRef } from "react";
import api from "../../services";
import './style.css';
import ColorThief from 'colorthief';
import { ReactComponent as IconPlay } from "./icon/play-fill.svg";
import { ReactComponent as Info } from "./icon/info-circle.svg";
import { Link } from "react-router-dom";

function Desktop(){
const [sombra, setSombra] = useState("");
const [filmeAleatorio, setFilmeAleatorio] = useState({});
const img = `https://image.tmdb.org/t/p/original/${filmeAleatorio.backdrop_path}`;
const [color, setColor] = useState("");
    let dataAtual = new Date();
    let ano = dataAtual.getFullYear().toString();
    let mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
    let dia = ("0" + dataAtual.getDate()).slice(-2);
    let dataCompleta = `${ano}-${mes}-${dia}`;




   
    
      const imageRef = useRef(null);
      
      useEffect(() => {
        const imgElement = imageRef.current;
        if (imgElement) {
          const handleLoad = () => extractColor(imgElement);
          if (imgElement.complete) {
            handleLoad();
          } else {
            imgElement.addEventListener('load', handleLoad);
            return () => {
              imgElement.removeEventListener('load', handleLoad);
            };
          }
        }
      }, [img]);
    
      const extractColor = (imgElement) => {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(imgElement);
        setColor(`rgb(${color[0]},${color[1]},${color[2]})`);
        setSombra(`rgb(${color[0]},${color[1]},${color[2]}, 0.804)`);
      };

    useEffect(() => {
        
    
        const obterFilmeAleatorio = async () => {
          try {
            const resposta = await api.get("/discover/movie", {
              params: {
                api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
                sort_by: "popularity.desc",
                language: "pt-BR",
                "primary_release_date.lte": dataCompleta,
                page: Math.floor(Math.random() * 100) + 1,
              },
            });
    
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
    
        obterFilmeAleatorio();
      }, [dataCompleta]);
    return(
        <div className="slide">
        <div className="ConjuntoSlide">
          <div className="textoConjuntoSlide">
            <div className="tituloSlide">
              <div>{filmeAleatorio.title}</div>
            </div>
            <div className="resumoSlide">{filmeAleatorio.overview}</div>
            <div className="botoesSlide">
              <div className="div-botoesSlide-desk">
                <Link to={`/FilmePlay/${filmeAleatorio.id}`}>
                  <button className="assistirSlide"><div className="div-desk-icon"><IconPlay className="icon-bnt-play"/></div><div className="text-bnt-play"><span>Assistir</span></div></button>
                </Link>
                <Link to={`/Filme/${filmeAleatorio.id}`}>
                  <button className="bnt-infoSlide-desk"><div className="div-desk-icon"><Info className="icon-bnt-info"/></div><div className="text-bnt-info"><span>Mais informações</span></div></button>
                </Link>
              </div>
              
            </div>
          </div>
  
          <div>   <img className="img-desk-film-aleatorio" src={img} alt="" /></div>
         <div className="sombras-desk"></div>
        </div>
      </div>
    )
}
export default Desktop;