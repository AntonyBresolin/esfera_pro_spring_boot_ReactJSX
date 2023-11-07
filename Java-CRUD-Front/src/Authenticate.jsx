import { createContext, useState } from "react"
import App from "./App"

export const AuthContext = createContext()

export const Authenticate = () => {
    const [auth, setAuth] = useState({user: '', authenticated: false})
    
    const login = (username, password) => {

        return new Promise((resolve, reject) => {

             if (password === "password") {
                  setAuth({user: username, authenticated: true})
                  resolve("success")
             } else {
                  reject("Incorrect username or password")
             }
        }) 
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