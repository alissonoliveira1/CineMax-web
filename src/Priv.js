import { useState, useEffect } from "react"
import {auth} from "./firebaseConnect"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom"
import { json } from "react-router-dom"


export default function Priv({children}){

const [loading,setloading] = useState(true)
const[login,setlogin] = useState(false)

useEffect(()=>{
    async function logado(){
        const subs = onAuthStateChanged(auth, (user)=>{
            if(user){
                const userdata={
                    uid:user.uid,
                    email:user.email
                }
          localStorage.setItem("@usuario",JSON.stringify(userdata))
          setloading(false)
          setlogin(true)
            }else{
             setlogin(false)
             setloading(false)
            }
        })

    }
    logado()
},[])
if(loading){
    return(
        <div className="load">
        <div className="loadd"></div>
      </div>
    )
  
    
}  if(!login){
 return <Navigate to="/"/>
    }



    return children
}