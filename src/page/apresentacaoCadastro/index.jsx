import "./style.css";
import { useState } from "react";
import { auth } from "../../firebaseConnect";
import { useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ReactComponent as Arrow } from "../../assets/icons/arrow-right.svg";
const Img = require("../../assets/images/img.jpg");
const project = require("../../assets/images/projet-AC.png");
const tv = require("../../assets/images/tv-AC.png");
const perfil = require("../../assets/images/perfil-AC.png");
const telescopio = require("../../assets/images/teles-AC.png");
const logo = require("../../assets/images/CineMax.png");
function ApresentacaoCadastro() {
  const [email, setConta] = useState("");
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/Login");
  };

  const handleVerifica = async (e) => {
    e.preventDefault();
    try {
      
      const conta = await fetchSignInMethodsForEmail(auth, email);
      if (conta.length > 0) {
        navigate("/Login", { state: { email } });
      } else {
        navigate("/Cadastro", { state: { email } });
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="div-img">
        <img className="imgAC" src={Img} alt="Imagem de cadastro" />
        <div className="backgroundImgAC"></div>
        <div className="containerTextImputAC">
          <div className="navebar-AC">
            <div>
              <img className="logo-AC" src={logo} alt="" />
            </div>
            <div className="div-bnt-login">
              <button onClick={handleNavigate} className="login-bnt">
                Entrar
              </button>
            </div>
          </div>
          <div className="containerTextAC">
            <div className="div-title-AC">
              <span className="span-title-AC">
                Do cinema ao streaming e muito mais, sem limites
              </span>
            </div>
            <div className="div-descricao-AC">
              <span className="span-descricao-AC">
                Quer assistir? Informe seu email para criar ou reiniciar sua
                assinatura.
              </span>
            </div>
            <div className="div-input-AC">
              <form
                onSubmit={handleVerifica}
                className="form-input-AC"
                action=""
              >
                <input
                  className="input-AC"
                  type="email"
                  onChange={(e) => setConta(e.target.value)}
                  value={email}
                  placeholder="Email"
                  name=""
                  id=""
                />
                <div className="div-bnt-cadastro-AC">
                  <button type="submit" className="bnt-cadastro-AC">
                    Bora lá <Arrow className="arrow-Button-AC" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="containerAC2">
        <div className="containerAC">
          <div className="boxAC">
            <div>
              <span className="titleAcBOX">Assista onde quiser</span>
            </div>
            <div>
              <span className="descricaoBox">
                Assista a quantos filmes e séries quiser no celular, tablet,
                laptop e TV.
              </span>
            </div>
            <div className="div-img-Box1">
              <div className="div-filho-box">
                <img className="img-Box" src={telescopio} alt="" />
              </div>
            </div>
          </div>
          <div className="boxAC">
            <div>
              <span className="titleAcBOX">Aproveite na TV</span>
            </div>
            <div>
              <span className="descricaoBox">
                Assista em Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                aparelhos de Blu-ray e outros dispositivos.
              </span>
            </div>
            <div className="div-img-Box2">
              <div className="div-filho-box">
                <img className="img-Box" src={tv} alt="" />
              </div>
            </div>
          </div>
          <div className="boxAC">
            <div>
              <span className="titleAcBOX">Catálogo do cinema a streaming</span>
            </div>
            <div>
              <span className="descricaoBox">
                Descubra a magia do cinema e as emoções do streaming reunidas em
                um só lugar. Com nossa plataforma
              </span>
            </div>
            <div className="div-img-Box3">
              <div className="div-filho-box">
                <img className="img-Box" src={project} alt="" />
              </div>
            </div>
          </div>
          <div className="boxAC">
            <div>
              <span className="titleAcBOX">Crie perfis para sua familia</span>
            </div>
            <div>
              <span className="descricaoBox">
                Deixe sua familia se aventurarem com seus personagens favoritos
                em um perfil feito só para elas, sem pagar a mais por isso.
              </span>
            </div>
            <div className="div-img-Box4">
              <div className="div-filho-box">
                <img className="img-Box" src={perfil} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ApresentacaoCadastro;
