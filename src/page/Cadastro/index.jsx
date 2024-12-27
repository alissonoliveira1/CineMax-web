import "./style.css";
import { useStepContext } from "../../contexts/contxPassos";
import PassosMenu from "../../components/Passos/PassosMenu/passos";
import Passo1 from "../../components/Passos/Passo1/passo1";
import Passo2 from "../../components/Passos/Passo2/passo2";
import Passo3 from "../../components/Passos/Passo3/Passo3";
const Img = require("../../assets/images/CineMax.png");
export default function Cadastro() {
  const { step } = useStepContext();

  return (
    <div className="container-cadastro">
      <header className="header-cadastro">
        <nav className="nav-cadastro">
          <div>
            <img className="img-cadastro-logo" src={Img} alt="img" />
          </div>

          <div className="div-entrar-cadastro">
            <button className="bnt-entrar-cadastro">Entrar</button>
          </div>
        </nav>
      </header>
      <PassosMenu />
      
      <div className="passos-container">
        <div className={`passo ${step === 1 ? "active" : step < 1 ? "left" : "right"}`}>{step === 1 && <Passo1 />}</div>
        <div className={`passo ${step === 2 ? "active" : step < 2 ? "right" : "left"}`}>{step === 2 && <Passo2 />}</div>
        <div className={`passo ${step === 3 ? "active" : step < 3 ? "right" : "left"}`}>{step === 3 && <Passo3 />}</div>
      </div></div>
  
  );
}
