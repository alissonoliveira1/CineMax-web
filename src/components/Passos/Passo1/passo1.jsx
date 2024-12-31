import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { provider } from "../../../firebaseConnect";
import { useNavigate } from "react-router-dom";
import { useStepContext } from "../../../contexts/contxPassos";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { ReactComponent as Google } from "../../../assets/icons/google.svg";
import { ReactComponent as Check } from "../../../assets/icons/check2-circle.svg";
import "./style.css";
const Passo1 = () => {
  const { setStep, emailCX, setIsAccountCreated, isAccountCreated } =
    useStepContext();

  const navegador = useNavigate();
  const [email2, setEmail] = useState(emailCX);
  const [senha, setSenha] = useState("");
  const auth = getAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (email2 === "" && senha === "") {
      toast.warn("Email e senha não preenchidos!");
    } else if (senha === "") {
      toast.warn("Senha não preenchida!");
    } else if (email2 === "") {
      toast.warn("Email não preenchido!");
    } else {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email2, senha)
        .then(() => {
          sendEmailVerification(auth.currentUser);

          setEmail("");
          setSenha("");

          setStep(2);
          setIsAccountCreated(true);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.warn("este email ja existe!");
          }
          if (error.code === "auth/weak-password") {
            toast.warn("senha fraca!");
          }
          if (error.code === "auth/network-request-failed") {
            toast.warn("Ha um problema na conexão !");
          }
        });
    }
  }
  async function loginGoogle() {
    signInWithPopup(auth, provider)
      .then(() => {
        setStep(3);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handlProx() {
    setStep(2);
  }
  return (
    <div>
      <div className="container-passo1">
        <div className="div-passo1-form">
          {!isAccountCreated ? (
            <>
              <div className="container-passo1-titulo">
                <div>
                  <span className="title-passo1">
                    Crie uma senha para iniciar sua assinatura
                  </span>
                </div>
                <div>
                  <span className="subtitle-passo1">
                    Faltam só mais alguns passos! <br />
                    Nós também detestamos formulários.
                  </span>
                </div>
              </div>
              <form className="form-passo1" onSubmit={handleSubmit}>
                <input
                  placeholder="Email"
                  value={email2}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />

                <input
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  type="password"
                />
                <div className="div-bnt-passo1">
                  <button type="submit">Próximo</button>
                </div>
                <div className="div-ou-passo1">
                  <span>OU</span>
                </div>
                <div onClick={loginGoogle} className="button-Google-passo1">
                  <Google className="GoogleLoginIcon" />
                  <div>
                    <span>Cadastrar conta Google </span>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="container-passo1-p2">
                <div>
                  <Check className={"icon-check-passo1"} />
                </div>
                <div>
                  <div className="title-passo1-p2">
                    <span>Obá, conta criada!</span>
                  </div>
                  <div className="subtitle-passo1-p2">
                    <span>
                      Sua conta criada, aperte o botão para continuar! 
                    </span>
                    <span style={{ fontWeight: "600" }}> {emailCX}</span>
                  </div>
                </div>
                <div className="div-bnt-passo1-p2">
                  <button onClick={handlProx} >
                    Próximo
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default React.memo(Passo1);
