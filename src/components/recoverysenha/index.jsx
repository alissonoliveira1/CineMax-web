
import './style.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
import { sendPasswordResetEmail } from 'firebase/auth'
export default function Recoverysenha(){
const [conta, setConta] = useState('')


async function handdleRecovery(e){
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, conta)
  .then((link) => {
  toast.success('Email enviado com sucesso')   
    console.log(link)
  })
  .catch((error) => {
   toast.error('Email não encontrado')  
  });
}
    return(
       
            <div className="container-recovery">
                <div className="recovery">
                    
                    <div className='recovery-title'>Recuperação de senha</div>
                    <form onSubmit={handdleRecovery}>
                        <div className="input-recovery">
                            <input value={conta} onChange={(e) => setConta(e.target.value)} type="email" placeholder="Email"/>
                        </div>
                        <div className="button-recovery">
                            <button>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
     
    )
}