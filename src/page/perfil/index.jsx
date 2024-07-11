
import { db } from "../../firebaseConnect";
import { useState, useEffect } from "react";
import './style.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/user";
import { useContext } from "react";
import { 
    doc,
    setDoc,
    addDoc,
    collection,
    onSnapshot,
    query,
    where
 } from "firebase/firestore";
function Perfil() {
    const navegador = useNavigate()
    const [end, setend] = useState(null)
    const [user1, settuser] = useState([]);
    const [user2, settuser2] = useState({});
    const [criacao, setcriacao] = useState("")
   const [user3, settuser3] = useState([])

   const {user} = useContext(UserContext)
   const {photo} = useContext(UserContext)
   console.log(photo)



         if(photo.length > 0){
    navegador("/home")
    
   }  
        
    

useEffect(()=>{
const perfil = async () =>{
   await onSnapshot(doc(db, "cineUser", "avatar"), (doc) => {
           settuser3(doc.data().icons) 
         
      });
    
    

}
perfil()
},[])

useEffect(() => {
    async function dadosFav() {
     
   

      if (user) {
        

        

        const tarefaRef = collection(db, "cineData");

        const q = query(
          tarefaRef,
     
          where("userUid", "==", user.uid)
        );

         onSnapshot(q, (Snapshot) => {

          let lista = [];
          Snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              usuario: doc.data().usuario,
            });
            
          });
         settuser(lista);
    
        }); 
      }
    }
    dadosFav();
  }, []);

   useEffect(()=>{
    async function dados(){
      const userdatalhes = localStorage.getItem("@usuario");
      settuser2(JSON.parse(userdatalhes));
    }
    dados()
   },[])
  function salvarfilme(){
 
    const hasfilme = user1.some(
      (novo) => novo.usuario === null
    );
    

    if (hasfilme) {
     
    
    }
  }
  salvarfilme()


    async function addnome() {
       if(end === null){
    
    navegador("/home")
    await setDoc(doc(db,"cineData", user.uid),{
        userUid: user.uid,
        usuario: user3.icons[0].url,
        nome: criacao
        
      })
      .then(() => {
          console.log("registrado");
         
        })
      
        .catch((error) => {
          console.log("error ao registrar" + error);
        });
}else{ 
  navegador("/home")
    await setDoc(doc(db,"cineData", user.uid),{
        userUid: user.uid,
        usuario: end,
        nome: criacao
        
      })
      .then(() => {
          console.log("registrado");
         
        })
      
        .catch((error) => {
          console.log("error ao registrar" + error);
        });
      }
      
    }

function addphoto(e){
    setend(e)

}

    return (
        <div className="containerPerfil">
             <div className="perfil-titulo">
                    <span>Perfil</span>
             </div>
             <div>
                <form className="form-perfil" onSubmit={addnome}>
                <input type="text"  value={criacao} onChange={(e) => setcriacao(e.target.value)}/>
                <button  type="submit">Criar</button>
                </form>
             </div>
             <div className="combo-perfil">
           
             
             {user3.length > 0 ? (
        user3.map((e, index) => (
        
           <div key={index}><img className="perfil"  onClick={() => addphoto(e.url)} src={e.url} alt="perfil" /></div>
           
      
        ))
      ) : (
        <p>Nenhum dado disponível</p>
      )}
    </div>
             </div>
          
          
     
    )

}
export default Perfil; 

