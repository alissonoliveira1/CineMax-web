import './style.css'
import { useState } from 'react';
import { UserContext } from '../../contexts/user';
import { useContext } from 'react';
import { getAuth, deleteUser, reauthenticateWithCredential,EmailAuthProvider } from 'firebase/auth';
export default function DeleteConta(){
    const {user} = useContext(UserContext)
    const email = user.email

    const [senha, setSenha] = useState('')
 
async function haddleDelete(){
    const credential = EmailAuthProvider.credential(email, senha)
    const auth = getAuth();
    const user = auth.currentUser;
    reauthenticateWithCredential(user, credential).then(() => {
       
        deleteUser(user)
      }).catch((error) => {
       
      });



}
    return(
        <div className="deletar-conta">
           
            <div className="deletar-conta-div">
                <div className="deletar-conta-title">Deletar conta</div>
                <div className="deletar-conta-msg">Tem certeza que deseja deletar sua conta?</div>
                <div className="deletar-conta-buttons">
                    <input type="password" value={senha} placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />
                    <button onClick={haddleDelete} >Deletar</button>
                  
                </div>
            </div>
        </div>
    )
}