import { createContext, useState } from "react"
import App from "./App"

export const AuthContext = createContext()

export const Authenticate = () => {
    const [auth, setAuth] = useState({user: '', authenticated: false})
    
    const login = async (data) => {
     if (data.username === "" || data.password === "") {
            return false
     }
    const res = await fetch(`http://localhost:8080/api/user/${data.username}/${data.password}`)
    const resData = await res.json()
             if (res.ok) {
                  setAuth({user: resData.name, authenticated: true})
             }
   }

   const logout = () => {
        setAuth({...auth, authenticated: false})
   }

    return (
        <AuthContext.Provider value={{auth, login, logout}}>
            <App/>
        </AuthContext.Provider>
    )
}