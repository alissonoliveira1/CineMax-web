 import { useState, useEffect } from "react";
 import Colorbackground from "../ColorBackground";
 import api from "../../services";
import './style.css';
import { Link } from "react-router-dom";
 function  ApresentaçãoMobile() {
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




   return  (
     <Link to={`/FilmePlay/${filmeAleatorio.id}`} className="div-mobile-style">
      <Colorbackground imageSrc={`https://image.tmdb.org/t/p//original/${filmeAleatorio.poster_path}`}/>
     </Link>
  );
}
export default ApresentaçãoMobile;