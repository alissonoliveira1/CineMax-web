import "./style.css";
import {  useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Google } from "./icon/google.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { provider } from "../../firebaseConnect";
import { getAuth, signInWithPopup} from "firebase/auth";

const Img = require("./imagemNet.jpg");

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navegador = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "" && senha === "") {
      toast.warn("Digite seu email e a senha!");
    } else if (email === "") {
      toast.warn("Email não preenchido!");
    } else if (senha === "") {
      toast.warn("Senha não preenchida!");
    } else {
      await signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
          setEmail("");
          setSenha("");
          navegador("/home", { replace: true });
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            toast.warn("Email ou senha estão incorretos!");
          }
          if (error.code === "auth/network-request-failed") {
            toast.warn("Ha um problema na conexão, tente novamente!");
          }
        });
    }
  }

  const auth = getAuth();
 
  async function loginGoogle() {
    signInWithPopup(auth, provider)
  .then(() => {
    navegador('/home')

  }).catch((error) => {
console.log(error)
  });
  }



  return (

    <div className="container-login">
      <div className="image-login" style={{ backgroundImage: `url(${Img})` }}>
        <div className="form-login-div">
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="entrar">
              <span>Entrar</span>
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

            <button type="submit">Entrar</button>
          </form>
          <div className="containerLoginGg">
            <span className="textLoginGG">Login com:</span>
            <div onClick={loginGoogle} className="iconGoogleDiv">
              <Google className="GoogleLoginIcon" />
            </div>
          </div>
          <div className="cad-login">
            <span className="texto-link">
              É novo aqui?
              <Link to={"/MetodoLogin"}>
                <span className="link-span"> assine agora!</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
