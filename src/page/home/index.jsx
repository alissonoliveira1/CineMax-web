import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "./style.css";
import React from "react";
import ContGenero from "../../components/conteudoGenero";
import Header from "../../components/header";
import MenuMobile from "../../components/MenuMobile";
import { UserContext } from "../../contexts/user";
import { auth } from "../../firebaseConnect";
import MenuSuspenso from "../../components/MenuSuspenso";
import ApresentaçãoMobile from "../../components/apresentaçãoMobile";
import Desktop from "../../components/apresentaçãoDesktop";
import ContDestaque from "../../components/conteudoDestaque";
//movie/now_playing?api_key=9f4ef628222f7685f32fc1a8eecaae0b&language=pt-br

function Home() {

 
  const { authStatus } = useContext(UserContext);
  const [poster, setPoster] = useState("");
  useEffect(() => {
    if (auth) {
      if (authStatus === false) {
        toast.warn("verifique seu email!");
      }
    }
  }, [authStatus]);

  useEffect(() => {
    const tela480 = window.matchMedia("(max-width: 480px)");

    const handleResize = (e) => {
      if (e.matches) {
        setPoster("poster_path");
      } else {
        setPoster("backdrop_path");
      }
    };
    handleResize(tela480);
    tela480.addEventListener("change", handleResize);

    return () => tela480.removeEventListener("change", handleResize);
  }, []);



  return (
    <div className="container2">
      <Header />
      <MenuMobile />
      <MenuSuspenso />
      <div className="slide">
        <div className="ConjuntoSlide">
          {poster === "poster_path" && <ApresentaçãoMobile />}
          {poster === "backdrop_path" && (
            <div className="cataaz">
              <Desktop />
            </div>
          )}
        </div>
      </div>

      <div className="listaPaiFilmes">
        <div className="tituloCat">
          <span>Em alta</span>
        </div>
        <div>
          <ContGenero genero={80} />
        </div>

        <div className="tituloCat">
          <span>Filmes de Ação</span>
        </div>

        <ContGenero genero={28} />
        <div className="tituloCat">
          <span>Animação</span>
        </div>

        <ContGenero genero={16} />

        <div className="tituloCat">
          <span>Filmes de terror</span>
        </div>
        <ContGenero genero={27} />

        <div className="tituloCat">
          <span>docomentarios</span>
        </div>
        <ContGenero genero={99} />
      </div>
    </div>
  );
}
export default Home;
