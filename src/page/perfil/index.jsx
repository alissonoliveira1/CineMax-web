
import { db } from "../../firebaseConnect";
import { useState, useEffect } from "react";
import './style.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import  Anng  from './icons/Anng-Avatar.jpeg'
import Naruto from './icons/naruto-Avatar.jpeg'
import Onepiece from './icons/one-piece-Avatar.jpeg'
import { 
    doc,
    addDoc,
    collection,
    onSnapshot,
    query,
    where
 } from "firebase/firestore";
function Perfil() {
    const navegador = useNavigate()
    const [samurai, setsamurai] = useState([]);
    const [onepiece, setonepiece] = useState([]);
    const [naruto, setnaruto] = useState([]);
    const [end, setend] = useState(null)
    const [user, settuser] = useState([]);
    const [user2, settuser2] = useState({});
    const [criacao, setcriacao] = useState("")
   
    useEffect(() =>{
     async function perfils(){
        onSnapshot(doc(db, "cineUser", "samurai"), (doc) => {
        
            setsamurai(doc.data())
        });
        onSnapshot(doc(db, "cineUser", "one piece"), (doc) => {
          
             setonepiece(doc.data())
         });
         onSnapshot(doc(db, "cineUser", "naruto"), (doc) => {
           
             setnaruto(doc.data())
         });


    }
perfils()
},[])


useEffect(() => {
    async function dadosFav() {
      const userdatalhes = localStorage.getItem("@usuario");
   

      if (userdatalhes) {
        const data = JSON.parse(userdatalhes);

        

        const tarefaRef = collection(db, "cineData");

        const q = query(
          tarefaRef,
     
          where("userUid", "==", data?.uid)
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
 async function salvarfilme() {
 
  

    const hasfilme = user.some(
      (novo) => novo.icon === samurai || naruto || onepiece
    );
    

    if (hasfilme) {
        navegador("/home")
      return;
    }
  

  
 

  }
  salvarfilme()


    async function addnome() {
       if(end === null){
    
    navegador("/home")
    await addDoc(collection(db,"cineData"),{
        userUid: user2?.uid,
        usuario: samurai,
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
    await addDoc(collection(db,"cineData"),{
        userUid: user2?.uid,
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
             <div>
                    <h1>Perfil</h1>
             </div>
             <div>
                <form onSubmit={addnome}>
                <input type="text"  value={criacao} onChange={(e) => setcriacao(e.target.value)}/>
                <button  type="submit">Criar</button>
                </form>
             </div>
             <div className="combo-perfil">
            
             <div><img className="perfil"  onClick={() => addphoto(samurai)} src={Anng} alt="perfil" /></div> 
             <div><img className="perfil"  onClick={() => addphoto(naruto)} src={Naruto} alt="perfil" /></div> 
            <div><img className="perfil"  onClick={() => addphoto(onepiece)} src={Onepiece} alt="perfil" /></div> 
             </div>
        
        </div>
    )

}
export default Perfil; 

