import { useState, createContext, useEffect } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import { auth,db } from "../firebaseConnect";
import {
    query,
    where,
    onSnapshot,
    collection,
  } from "firebase/firestore";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user,setuser] = useState(null)
    const [photo, setphoto] = useState([])
    const apiKey = "9f4ef628222f7685f32fc1a8eecaae0b"
useEffect(()=>{
    const userdatalhes = localStorage.getItem("@usuario");
      onAuthStateChanged(auth, (usuario) => {
       setuser(usuario)
      

       
    })
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
              nome: doc.data().nome,
              usuario: doc.data().usuario,
              favorito: doc.data().favorito,
      
            });
            
          });
          setphoto(lista);
    
        }); 
      }

},[ user])
const authStatus = user ? user.emailVerified : null;
    
     
     


    const login = (userdata) => {
        setuser(userdata)
    }
    const loginout = () =>{
     setuser(null)
    }
    return(
        <UserContext.Provider value={{authStatus,apiKey, photo ,user ,login,loginout}}>
          {children}
        </UserContext.Provider>
    )
}
export {UserProvider, UserContext}