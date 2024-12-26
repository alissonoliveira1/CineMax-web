import "./style.css";
import {  useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { ReactComponent as Google } from "./icon/google.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { provider } from "../../firebaseConnect";
import { getAuth, signInWithPopup} from "firebase/auth";
import { UserContext }  from '../../contexts/user'
import { useContext } from 'react';
const Img = require("../../assets/images/image-login.jpg");

export default function Login() {
    const location = useLocation();
    const {email} = location.state || {};
  const [email1, setEmail] = useState(email);
  const [senha, setSenha] = useState("");
  const navegador = useNavigate();

  const { user } = useContext(UserContext)
  if(user){
    navegador('/home')
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (email1 === "" && senha === "") {
      toast.warn("Digite seu email e a senha!");
    } else if (email1 === "") {
      toast.warn("Email não preenchido!");
    } else if (senha === "") {
      toast.warn("Senha não preenchida!");
    } else {
      await signInWithEmailAndPassword(auth, email1, senha)
        .then(() => {
          setEmail("");
          setSenha("");
          navegador("/perfil", { replace: true });
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
    navegador('/perfil')

  }).catch((error) => {
console.log(error)
  });
  }



  return (

    <div className="container-login">
      <div className="image-login">
       <div className="img-login">
         
            <img src={Img} alt="" />
                
       </div>
       <div className="form-login-div">
        <div className="title-login"><span>CineMax</span></div>
         <div className="div-form">
         <form className="form-login" onSubmit={handleSubmit}>
            <div className="entrar">
              <span>Entrar</span>
            </div>
            <input
              placeholder="Email"
              value={email1}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <input
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
            />
          
          <button className="bnt-entrar" type="submit">Entrar</button>
        
          
            
          </form>
          <div className="ou"><span>OU</span></div>
          <div className="containerLoginGg">
          
          <div onClick={loginGoogle} className="iconGoogleDiv">
            <Google className="GoogleLoginIcon" />
            <div>
              <span>Login com o Google</span>
            </div>
          </div>
         
        </div>
         <div className="cad-login">
            <span className="texto-link">
              É novo aqui?
              <Link to={"/"}>
                <span className="link-span"> assine agora!</span>
              </Link>
            </span>
          </div>
         </div>
         
         
        </div>
      </div>
    </div>
  );
}
