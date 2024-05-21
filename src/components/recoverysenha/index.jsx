
import './style.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
import { sendPasswordResetEmail } from 'firebase/auth'
export default function Recoverysenha(){
const [conta, setConta] = useState('')
function haddleExit(){
    
    const recovery = document.querySelector('.recovery-div-suspenso')
    recovery.classList.remove('active')
}

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
                    <div onClick={haddleExit} className='exit-recovery'><svg  xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-x-circle" className='svg-x' viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></div>
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