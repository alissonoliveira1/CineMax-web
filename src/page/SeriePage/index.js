import Serie from "../Serie";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services";
function SeriePage() {
  const { id } = useParams();
  const navegate = useNavigate();
  const [load, setload] = useState(true);
  const [filme, setfilme] = useState([]);
  const [temp, settemp] = useState([]);
  const [eps, seteps] = useState([]);
  const [numerotemp, setnumerotemp] = useState([]);



  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/tv/${id}`, {
          params: {
            api_key: "9f4ef628222f7685f32fc1a8eecaae0b",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setfilme(response.data);
          settemp(response.data);
          setnumerotemp(response.season_number);
          setload(false);
        })
        .catch(() => {
          console.log("filme não encontrado");
          navegate("/", { replace: true });
          return;
        });
    }
    

    loadFilme();

    return () => {};
  }, [navegate, id]);

  function info(){
    
  }

  if (load) {
    return <div className="detalhes">Carregando detalhes...</div>;
  }
  return (
    <div key={filme.id}>
      <img
        className="capa"
        alt={filme.name}
        src={`https://image.tmdb.org/t/p//original/${filme.backdrop_path}`}
      />
      <div></div>
      <div>{filme.name}</div>
      <div>
        {filme.seasons.map((i) => {
          return( 
            <div key={i.id}>

                <div onClick={(e) => info(i.season_number)}>{i.name}</div>
              
            </div>
          )
        })}
      </div>
      
    </div>
  );
}
export default SeriePage;
