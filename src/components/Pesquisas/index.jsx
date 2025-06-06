import { useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { UserContext } from "../../contexts/user";
import "./style.css";
import { ReactComponent as Lupa } from "../../assets/icons/search.svg";
import api from "../../services";

function Pesquisas() {
  const [valorPesquisa, setValorPesquisa] = useState("");
  const [poster, setposter] = useState("");
  const navigate = useNavigate();
  const [larguraInput, setLarguraInput] = useState(0);
 const {apiKey} = useContext(UserContext);

  let dataAtual = new Date();
  let ano = dataAtual.getFullYear().toString();
  let mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
  let dia = ("0" + dataAtual.getDate()).slice(-2);

  let dataCompleta = `${ano}-${mes}-${dia}`;

  const fetchData = async () => {
    const pesquisa = valorPesquisa.split(" ").join("+");
    try {
      const response = await api.get("search/multi", {
        params: {
          query: pesquisa,
          api_key: apiKey,
          "primary_release_date.lte": dataCompleta,
          language: "pt-br",
        },
      });

      navigate("/pesquisa", { state: { resultados: response.data.results } });
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    const lupa = document.body.querySelector(".div-input");
    if (lupa) {
      const estiloComputado = window.getComputedStyle(lupa);
      const largura = estiloComputado.getPropertyValue("width");
      setLarguraInput(largura);
    }
  }, []);

  useEffect(() => {
    const tela480 = window.matchMedia("(max-width: 480px)");

    const handleResize = (e) => {
      if (e.matches) {
        setposter("480px");
      } else {
        setposter("250px");
      }
    };
    handleResize(tela480);
    tela480.addEventListener("change", handleResize);

    return () => tela480.removeEventListener("change", handleResize);
  }, []);

  const lupas = document.querySelector(".pesquisa");
  const handleLupa = () => {
    if (larguraInput === "250px") {
      setLarguraInput(poster);
      lupas.classList.add("pesquisaAtiva");
    } else {
      setLarguraInput(poster);
      lupas.classList.add("pesquisaAtiva");
    }
  };

  const handleSubmit = async (event) => {
    if (larguraInput === "0px") {
      lupas.classList.add("pesquisaAtiva");
      setLarguraInput("poster");
    }
    if (valorPesquisa !== "") {
      event.preventDefault();
      await fetchData();
    }
    event.preventDefault();
  };
function handleLupaMobile(){
  navigate("/pesquisa");
}
  return (
    <div className="div-pesquisa-principal">
      <form className="pesquisa " onSubmit={handleSubmit}>
        <div
          className="div-input pesquisamobile"
          style={{ width: larguraInput }}
        >
          {" "}
          <input
            className="input-pesquisa"
            type="text"
            value={valorPesquisa}
            onChange={(event) => setValorPesquisa(event.target.value)}
            placeholder="Digite sua pesquisa..."
          />
        </div>
        {poster === "480px" ? (
           <div>
           <button
             onClick={handleLupaMobile}
             className="botao-pesquisa"
             type="submit"
           >
             <Lupa className="lupa" />
           </button>
         </div>
        ) : (
          <div>
          <button
            onClick={handleLupa}
            className="botao-pesquisa"
            type="submit"
          >
            <Lupa className="lupa" />
          </button>
        </div>
        )}
      </form>
    </div>
  );
}
export default Pesquisas;
