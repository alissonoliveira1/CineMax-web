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
              
      
            });
            
          });
          setphoto(lista);
    
        }); 
      }

},[])
const authStatus = user ? user.emailVerified : null;
    
     
     


    const login = (userdata) => {
        setuser(userdata)
    }
    const loginout = () =>{
     setuser(null)
    }
    return(
        <UserContext.Provider value={{authStatus, photo ,user ,login,loginout}}>
          {children}
        </UserContext.Provider>
    )
}
export {UserProvider, UserContext}