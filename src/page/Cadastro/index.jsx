import { useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth";
const Img = require("./imagemNet.jpg");

export default function Cadastro() {
  const navegador = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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

  return (
    <div className="container-login">
      <div className="image-login" style={{ backgroundImage: `url(${Img})` }}>
        <div className="form-login-div7">
          <form className="form-login" onSubmit={handleSubmit}>
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

            <button type="submit">Entrar</button>
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
  );
}
