import { UserContext } from "../../contexts/user";
import { useContext } from "react";
import { auth } from "../../firebaseConnect";
import { signOut } from "firebase/auth";
import Recoverysenha from "../recoverysenha";
import DeleteConta from "../DeleteConta";
import './style.css';
function MenuSuspenso() {
    const { photo } = useContext(UserContext)
    
   
    function handdleDelete(){
      const deletar = document.querySelector('.deletar-conta22')
      deletar.classList.add('active')
      document.querySelector('.recovery-div-suspenso').classList.remove('active')
    }
    async function handleSair(){
        await signOut(auth)
      }
      function handdleRecovery(){
        const recovery = document.querySelector('.recovery-div-suspenso')
        recovery.classList.add('active')
        document.querySelector('.deletar-conta22').classList.remove('active')
      }
      function haddleExit2(){
        document.querySelector('.containerMSuspenso').classList.remove('activeSuspenso')

    }
  
  return (
    <div className="containerMSuspenso">
        
      
        <div  className="center-susp">

        
      <div className="center-susp-filho">
      <div onClick={haddleExit2} className='exit-recovery2'><span>Voltar</span></div>
      <div>{photo.map((e, index)=>{
        return(
          <div key={index} className="icon-name-menuSusp">
            <img className='img-perfil-menuSusp' src={e.usuario} alt="avatar" />
            <div  className="name-usuario">{e.nome}</div>
          </div>
            
        )
      })}</div>
      <div className="menu-ul-suspenso-div">
      <ul className="menu-ul-suspenso">
      <li >Editar seu perfil</li>
        <li onClick={handdleDelete}>Deletar conta</li>
        <li onClick={handdleRecovery}>Redefinir a senha</li>
        <li onClick={handleSair} >Sair da conta</li>
        
      </ul>
      </div>
      </div>
      </div>
      <div className="telas-opcoes">
      <div className="recovery-div-suspenso"><Recoverysenha /></div>
      <div className="deletar-conta22"><DeleteConta/></div>
      </div>
    </div>
  )
}   
export default MenuSuspenso;