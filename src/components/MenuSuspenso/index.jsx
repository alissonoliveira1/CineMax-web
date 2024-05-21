import { UserContext } from "../../contexts/user";
import { useContext } from "react";
import { auth } from "../../firebaseConnect";
import { signOut } from "firebase/auth";
import Recoverysenha from "../recoverysenha";
import DeleteConta from "../DeleteConta";
import './style.css';
function MenuSuspenso() {
    const { photo } = useContext(UserContext)
    const { authStatus } = useContext(UserContext)
    console.log(photo)
    function handdleDelete(){
      const deletar = document.querySelector('.deletar-conta22')
      deletar.classList.add('active')
    }
    async function handleSair(){
        await signOut(auth)
      }
      function handdleRecovery(){
        const recovery = document.querySelector('.recovery-div-suspenso')
        recovery.classList.add('active')
      }
  
  return (
    <div className="containerMSuspenso">
        <div className="recovery-div-suspenso"><Recoverysenha /></div>
        <div className="deletar-conta22"><DeleteConta/></div>
        
      <div>{photo.map((e, index)=>{
        return(
            <div key={index} className="name-usuario">{e.nome}</div>
        )
      })}</div>
      <ul className="menu-ul-suspenso">
        <li onClick={handdleDelete}>Deletar conta</li>
        <li onClick={handdleRecovery}>redefinir a senha</li>
        <li className="li-veri-email"><div>verificar email</div><div className="barra"></div><div className="msg-verificao">{authStatus ? <span>email verificado</span> : <span>email não verificado</span>}</div></li>
        <li onClick={handleSair} >Sair</li>
        
      </ul>
      
    </div>
  )
}   
export default MenuSuspenso;