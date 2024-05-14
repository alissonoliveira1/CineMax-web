import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import erros from "./erro.png";
import "./style.css";
import MenuMobile from "../../components/MenuMobile";
function Pesquisa() {
  const location = useLocation();
  const { resultados } = location.state || [];
  return (
    <>
  <Header/>
    <div className="pesquisa2">
      
       
        {resultados && resultados.length > 0 ? (
          <ul className="filmes-ul ">
            {resultados.map((filme) => (
              <Link to={filme.media_type === "movie" ? `/filme/${filme.id}` : `/SeriePage/${filme.id}`}>
                <li className="lista-filmes" key={filme.id}>
                  <img
                    className="imagem imagem-pesquisa"
                    alt={filme.title}
                    src={`https://image.tmdb.org/t/p//original/${filme.poster_path}`}
                  />
                 
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="msg-n">
            <img className="img-erros" alt="error" src={erros} />
            <p className="msg-notfould">Nenhum resultado encontrado.</p>
          </div>
        )}
        <MenuMobile/>
      </div>
   </>
  );
}
export default Pesquisa;
