import { useState, useEffect, useRef } from "react";
import ColorThief from 'colorthief';
import api from "../../services";
import './style.css';
import { Link } from "react-router-dom";

function ApresentacaoMobile() {
  const [filmeAleatorio, setFilmeAleatorio] = useState({});
  const [color, setColor] = useState("");
  const imageRef = useRef(null);

  let dataAtual = new Date();
  let ano = dataAtual.getFullYear().toString();
  let mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
  let dia = ("0" + dataAtual.getDate()).slice(-2);
  let dataCompleta = `${ano}-${mes}-${dia}`;
  const img = `https://image.tmdb.org/t/p/original/${filmeAleatorio.poster_path}`;

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

  useEffect(() => {
    const imgElement = imageRef.current;
    if (imgElement) {
      const handleLoad = () => extractColor(imgElement);
      if (imgElement.complete) {
        handleLoad();
      } else {
        imgElement.addEventListener('load', handleLoad);
        // Cleanup listener to avoid memory leaks
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
  };

  return (
    <div className="div-mobile-style">
    
     <div className="Div-img-Background" style={{ boxShadow: `0px 10px 100px 100px ${color}`, backgroundColor: color }}>
     <img
      className="imgBackground"
        ref={imageRef}
        
        src={img}
        alt="Poster"
        crossOrigin="anonymous"
      />
     </div>
   
      <div  className="bnts-mobile-slide">
        <div className="bnt-slide ">
          <Link to={`/FilmePlay/${filmeAleatorio.id}`}><button className="bnt-slide-asistir">Assistir</button></Link>
        </div>
        <div className="bnt-slide "><button className="bnt-slide-favoritos">+Favoritos</button></div>
      </div>
    </div>
  );
}

export default ApresentacaoMobile;