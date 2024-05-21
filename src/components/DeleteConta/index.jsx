import './style.css'
import { useState } from 'react';
import { UserContext } from '../../contexts/user';
import { useContext } from 'react';
import { getAuth, deleteUser, reauthenticateWithCredential,EmailAuthProvider } from 'firebase/auth';
export default function DeleteConta(){
    const {user} = useContext(UserContext)
    const email = user.email

    const [senha, setSenha] = useState('')
    function haddleExit(){
    const close = document.querySelector('.deletar-conta22')
    close.classList.remove('active')

}
async function haddleDelete(){
    const credential = EmailAuthProvider.credential(email, senha)
    const auth = getAuth();
    const user = auth.currentUser;
    reauthenticateWithCredential(user, credential).then(() => {
       
        deleteUser(user)
      }).catch((error) => {
        // An error ocurred
        // ...
      });



}
    return(
        <div className="deletar-conta">
            <div onClick={haddleExit} className='exit-recovery'><svg  xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-x-circle" className='svg-x' viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></div>
            <div className="deletar-conta-div">
                <div className="deletar-conta-title">Deletar conta</div>
                <div className="deletar-conta-msg">Tem certeza que deseja deletar sua conta?</div>
                <div className="deletar-conta-buttons">
                    <input type="password" value={senha} placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />
                    <button onClick={haddleDelete} >sim</button>
                  
                </div>
            </div>
        </div>
    )
}