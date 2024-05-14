import "./style2.css";
import { 
  getAuth,
  signInWithPopup,
} from "firebase/auth"
import { ReactComponent as Email } from "./icon/email.svg";
import { ReactComponent as Google } from "./icon/google.svg";
import { provider  } from "../../firebaseConnect";
import { Link, useNavigate } from "react-router-dom";



export default function MetodoLogin(){



const auth = getAuth();    
const navegador = useNavigate();

async function loginGoogle() {
  signInWithPopup(auth, provider)
  .then((result) => {
 
   navegador('/home');
   
  }).catch((error) => {
console.log(error)
  });
}




    return(
        <div className='containerMetodo'>
            <div className='FormMetodo'>

 <form className="formMT" >
          <li className="liMt" onClick={loginGoogle}><Google className="iconMT"/><span className="spanMT">Conta Google</span></li>
          <Link className="liMt" to={'/Cadastro'}>
          <li className="liMt2"><Email className="iconMT"/><span className="spanMT">Email e senha</span></li>
          </Link>
          
        
         
         </form>
            </div>
        

        </div>
    )
}