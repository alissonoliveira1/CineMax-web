import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filme from "./page/filme";
import Home from "./page/home";
import Erro from "./page/erro";
import Favoritos from "./page/favoritos";
import Pesquisa from "./page/Pesquisa";
import Pesquisas from "./components/Pesquisas";
import Serie from "./page/Serie";
import SeriePage from "./page/SeriePage";
import FilmePag from "./page/FilmePag";
import Play from "./page/Play";
import FilmePlay from "./page/FilmePlay";
import Login from "./page/Login";
import Cadastro from "./page/Cadastro";
import Priv from "./Priv";
import MetodoLogin from "./page/MetodoLogin";
import Perfil from "./page/perfil";
import ApresentacaoCadastro from "./page/apresentacaoCadastro";

function Rotas() {
  return (
    <BrowserRouter>
   
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<ApresentacaoCadastro />} />
          <Route
            path="/perfil"
            element={
              <Priv>
                <Perfil />
              </Priv>
            }
          />
          <Route path="/MetodoLogin" element={<MetodoLogin />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route
            path="/home"
            element={
              <Priv>
                <Home />
              </Priv>
            }
          />
          <Route
            path="/Serie"
            element={
              <Priv>
                <Serie />
              </Priv>
            }
          />
          <Route
            path="/Play/:id/:season_number/:episode_number"
            element={
              <Priv>
                <Play />
              </Priv>
            }
          />
          <Route
            path="/FilmePlay/:id"
            element={
              <Priv>
                <FilmePlay />{" "}
              </Priv>
            }
          />
          <Route
            path="/SeriePage/:id"
            element={
              <Priv>
                <SeriePage />
              </Priv>
            }
          />
          <Route
            path="/filme/:id"
            element={
              <Priv>
                <Filme />{" "}
              </Priv>
            }
          />
          <Route
            path="/FilmePag/"
            element={
              <Priv>
                <FilmePag />
              </Priv>
            }
          />
          <Route
            path="/Pesquisa"
            element={
              <Priv>
                <Pesquisa />
              </Priv>
            }
          />
          <Route
            path="/favoritos"
            element={
              <Priv>
                <Favoritos />
              </Priv>
            }
          />
          <Route
            path="/pesquisas"
            element={
              <Priv>
                <Pesquisas />
              </Priv>
            }
          />
          <Route
            path="/pesquisa"
            element={
              <Priv>
                <Pesquisa />
              </Priv>
            }
          />
          <Route path="*" element={<Erro />} />
        </Routes>
      
    </BrowserRouter>
  );
}
export default Rotas;
