
import { useState,useEffect } from "react";
import api from "../../services";
import './style.css';
import { ReactComponent as IconPlay } from "../../page/home/icon/icon-play.svg";
import { Link } from "react-router-dom";
import Colorbackground from "../ColorBackground";
function Desktop(){
const [filmeAleatorio, setFilmeAleatorio] = useState({});

    let dataAtual = new Date();
    let ano = dataAtual.getFullYear().toString();
    let mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
    let dia = ("0" + dataAtual.getDate()).slice(-2);
    let dataCompleta = `${ano}-${mes}-${dia}`;
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
              <div>
                <Link to={`/FilmePlay/${filmeAleatorio.id}`}>
                  <button className="assistirSlide"><div><IconPlay className="icon-bnt-play"/></div><div className="text-bnt-play"><span>Assisir</span></div></button>
                </Link>
              </div>
              
            </div>
          </div>
  
              <Colorbackground imageSrc={`https://image.tmdb.org/t/p//original/${filmeAleatorio.backdrop_path}`}/>
    
        </div>
      </div>
    )
}
export default Desktop;