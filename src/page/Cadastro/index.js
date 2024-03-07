
import { useState } from 'react'
import { auth } from '../../firebaseConnect'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { 
createUserWithEmailAndPassword


} from 'firebase/auth'
const Img = require('./imagemNet.jpg')
export default function Cadastro(){
   
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')

async function handleSubmit(e){
    
    e.preventDefault()
    
    if(email !== ''){
        if(senha !== ''){
           await createUserWithEmailAndPassword(auth, email, senha)
   .then(()=>{
   setEmail('')
   setSenha('')
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
              <div className='entrar'><span>Cadastro</span></div>
             <input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} type='text'/>   
          
            
        
             <input placeholder='Senha' value={senha} onChange={(e)=>setSenha(e.target.value)} type='text'/>   
         
            <button type='submit'>Entrar</button>
          </form>

          <div className='cad-login'><span className='texto-link'>Já tem conta? <Link to={"/"}><span className='link-span'>Acesse sua conta!</span></Link></span></div>
          </div>
          </div>
          
            
        </div>
    )
}