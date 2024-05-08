import { useState, createContext, useEffect } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConnect";
const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user,setuser] = useState(null)
    const [autentc, setauth] = useState(true)
useEffect(()=>{
      onAuthStateChanged(auth, (usuario) => {
       setuser(usuario)
      setauth(false)
       
    })
})
const authStatus = user ? user.emailVerified : null;
    
      
     


    const login = (userdata) => {
        setuser(userdata)
    }
    const loginout = () =>{
     setuser(null)
    }
    return(
        <UserContext.Provider value={{autentc, user ,login,loginout}}>
          {children}
        </UserContext.Provider>
    )
}
export {UserProvider, UserContext}