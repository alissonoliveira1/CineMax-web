import { useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import { provider } from "../../firebaseConnect";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth,signInWithPopup } from "firebase/auth";
import { ReactComponent as Google } from "../Login/icon/google.svg";
const Img = require("../../assets/images/img-cadastro.jpg");
export default function Cadastro() {
  const navegador = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const auth = getAuth();



  async function handleSubmit(e) {
    e.preventDefault();
 
    if (email === "" && senha === "") {
      toast.warn("Email e senha não preenchidos!");
    } else if (senha === "") {
      toast.warn("Senha não preenchida!");
    } else if (email === "") {
      toast.warn("Email não preenchido!");
    } else { 
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          
          sendEmailVerification(auth.currentUser)
        
          setEmail("");
          setSenha("");
          toast.success("Conta Cadastrada!");
          navegador("/perfil", { replace: true });
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
    navegador('/perfil')

  }).catch((error) => {
console.log(error)
  });
  }
  return (
    <div className="container-login">
      <div className="image-loginC" style={{ backgroundImage: `url(${Img})` }}>
      <div className="container-loginC">
      <div className="form-login-div7">
          <form className="form-loginC" onSubmit={handleSubmit}>
            <div className="entrar2">
              <span>Cadastro</span>
            </div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <input
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
            />
 <div className="containerLoginGgCad">
          
          <div onClick={loginGoogle} className="iconGoogleDivCad">
            <Google className="GoogleLoginIcon" />
            <div>
              <span>Cadastrar conta Google</span>
            </div>
          </div>
          <div className="div-bnt-loginCad">
          <button type="submit">Entrar</button>
          </div>
        </div>
          
          </form>

          <div className="cad-login2">
            <span className="texto-link2">
              Já tem conta?{" "}
              <Link to={"/"}>
                <span className="link-span2">Acesse sua conta!</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
