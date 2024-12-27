import React from "react";
import "./style.css";
import { useStepContext } from "../../../contexts/contxPassos";
import { ReactComponent as Shield } from "../../../assets/icons/shield-check.svg";
const Passo2 = () => {

   

  const { emailCX, setStep } = useStepContext();
  return (
    <div
   
    className="container-passo2"
  >
      <div  className="container-filho-passo2">
        <div>
          <Shield className="icon-shield-passo2" />
        </div>
        <span className="title-passo2">Ótimo, agora vamos verificar seu email</span>
        <p>Para confirmar, clique no link que enviamos para <span style={{fontWeight:'600'}}>{emailCX}</span></p>
        <span>
          A verificação do seu email aumenta a segurança da conta e ajuda você a
          receber comunicações importantes da CineMax.
        </span>
        <button className="bnt-passo2" onClick={() => setStep(3)}>Confirmar</button>
      </div>
    </div>
  );
};
export default React.memo(Passo2);
