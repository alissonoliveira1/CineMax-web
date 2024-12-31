import { useState, useEffect, useMemo,memo,useContext } from "react";
import { UserContext } from "../../contexts/user";
import api from "../../services";
import "./style.css";

import { ReactComponent as IconPlay } from "../../assets/icons/play-fill.svg";
import { ReactComponent as Info } from "../../assets/icons/info-circle.svg";
import { Link } from "react-router-dom";

const Desktop = () => {
  const { apiKey } = useContext(UserContext);
  const [filmeAleatorio, setFilmeAleatorio] = useState({});
  const [logo, setLogo] = useState("");
    const dataCompleta = useMemo(() => {
      return new Date().toISOString().split('T')[0];
    }, []);
  
    useEffect(() => {
      const obterFilmeComLogo = async () => {
        try {
          const resposta = await api.get("/discover/movie", {
            params: {
              api_key: apiKey,
              sort_by: "popularity.desc",
              language: "pt-BR",
              "primary_release_date.lte": dataCompleta,
              page: Math.floor(Math.random() * 10) + 1,
            },
          });
    
          const { results } = resposta.data;
    
          if (results && results.length > 0) {
            // Verifica logo para cada filme
            for (const filme of results) {
              try {
                const logoResponse = await api.get(`/movie/${filme.id}/images`, {
                  params: {
                    api_key: apiKey,
                    language: "pt",
                  },
                });
    
                const logos = logoResponse.data.logos;
                if (logos && logos.length > 0) {
                  // Atualiza estados com filme e logo
                  setFilmeAleatorio(filme);
                  setLogo(logos[0].file_path);
                  break; // Sai do loop após encontrar o primeiro filme válido
                }
              } catch (erroLogo) {
                console.error(`Erro ao buscar logo para o filme ${filme.id}:`, erroLogo);
              }
            }
          } else {
            console.error("Nenhum filme encontrado.");
          }
        } catch (erro) {
          console.error("Erro ao obter filmes:", erro);
        }
      };
    
      obterFilmeComLogo();
    }, [dataCompleta, apiKey]);
    

  const img = `https://image.tmdb.org/t/p/original/${filmeAleatorio.backdrop_path}`;

  return (
    <div className="slide">
      <div className="ConjuntoSlide">
        <div className="shadow-aleatorio-desk"></div>
        <div className="textoConjuntoSlide">
          <div className="div-title-conjunto-desk">
            {logo ? (
             <div className="div-title-img-desk">
               <img
                className="title-film-desk"
                alt={filmeAleatorio.title}
                src={`https://image.tmdb.org/t/p/original/${logo}`}
              />
             </div>
            ) : (
              <div className="div-title-film">
                <span className="title-film">{filmeAleatorio.title}</span>
              </div>
            )}
          </div>

          <div className="resumoSlide">{filmeAleatorio.overview}</div>
          <div className="botoesSlide">
            <div className="div-botoesSlide-desk">
              <Link to={`/FilmePlay/${filmeAleatorio.id}`}>
                <button className="assistirSlide">
                  <div className="div-desk-icon">
                    <IconPlay className="icon-bnt-play" />
                  </div>
                  <div className="text-bnt-play">
                    <span>Assistir</span>
                  </div>
                </button>
              </Link>
              <Link to={`/Filme/${filmeAleatorio.id}`}>
                <button className="bnt-infoSlide-desk">
                  <div className="div-desk-icon">
                    <Info className="icon-bnt-info" />
                  </div>
                  <div className="text-bnt-info">
                    <span>Mais informações</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="div-img-background-desk">
          <img className="img-desk-film-aleatorio" src={img} alt="" />
        </div>
        <div className="sombras-desk"></div>
      </div>
    </div>
  );
}
export default memo(Desktop);
