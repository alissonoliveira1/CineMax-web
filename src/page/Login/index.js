import './style.css'
import { useState } from 'react'
import { auth } from '../../firebaseConnect'
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

import { 
createUserWithEmailAndPassword,
signInWithEmailAndPassword

} from 'firebase/auth'
const Img = require('./imagemNet.jpg')
export default function Login(){
   
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const navegador = useNavigate()
async function handleSubmit(e){
    
    e.preventDefault()
    
    if(email !== ''){
        if(senha !== ''){
           await signInWithEmailAndPassword(auth, email, senha)
   .then(()=>{
   setEmail('')
   setSenha('')
   navegador('/home', {replace:true})
   })
   .catch(()=>{
    
    
   })    
        }else{
            toast.warn("senha não preenchida!");  
        }

    }else{
toast.warn("Email preenchido!");
    }
}


    return(
        <div className='container-login'>
          <div className='image-login' style={{backgroundImage:`url(${Img})`}}>
            <div className='form-login-div'>
               
            <form className='form-login' onSubmit={handleSubmit}>
              <div className='entrar'><span>Entrar</span></div>
             <input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} type='text'/>   
          
            
        
             <input placeholder='Senha' value={senha} onChange={(e)=>setSenha(e.target.value)} type='text'/>   
         
            <button type='submit'>Entrar</button>
          </form>

          <div className='cad-login'><span className='texto-link'>É novo aqui? <Link to={"/Cadastro"}><span className='link-span'>Assine agora!</span></Link></span></div>
          </div>
          </div>
          
            
        </div>
    )
}