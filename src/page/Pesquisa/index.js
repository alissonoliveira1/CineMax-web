import Pesquisas from "../../components/Pesquisas";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Erros from "./erro.png";
import "./style.css";
function Pesquisa() {
  const location = useLocation();
  const { resultados } = location.state || [];

  return (
    <div className="pesquisa2">
      
       
        {resultados && resultados.length > 0 ? (
          <ul className="filmes-ul">
            {resultados.map((filme) => (
              <Link to={`/filme/${filme.id}`}>
                <li className="lista-filmes" key={filme.id}>
                  <img
                    className="imagem"
                    alt={filme.title}
                    src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}
                  />
                 
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="msg-n">
            <img className="img-erros" src={Erros} />
            <p className="msg-notfould">Nenhum resultado encontrado.</p>
          </div>
        )}
      </div>
   
  );
}
export default Pesquisa;
