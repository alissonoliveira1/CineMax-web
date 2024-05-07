import { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user,setuser] = useState(null)

    const login = (userdata) => {
        setuser(userdata)
    }
    const loginout = () =>{
     setuser(null)
    }
    return(
        <UserContext.Provider value={{ user ,login,loginout}}>
          {children}
        </UserContext.Provider>
    )
}
export {UserProvider, UserContext}