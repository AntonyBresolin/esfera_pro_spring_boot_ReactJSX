import { createContext, useState } from "react"
import App from "./App"

export const AuthContext = createContext()

export const Authenticate = () => {   
    const [auth, setAuth] = useState(
        localStorage.getItem('authToken') 
        ? JSON.parse(localStorage.getItem('authToken')) 
        : {user: "", authenticated: false}
    )

    const login = async (data) => {
     if (data.username === "" || data.password === "") {
            return false
     }
    const res = await fetch(`http://localhost:8080/api/user/${data.username}/${data.password}`)
    console.clear()
    if (res.ok) {
        const resData = await res.json()
        setAuth({user: resData.name, authenticated: true})
        localStorage.setItem('authToken', JSON.stringify({user: resData.name, authenticated: true}))
        return true
    } else {
        return false
    }
   }

   const logout = () => {
        localStorage.removeItem('authToken')
        setAuth({user: "", authenticated: false})
   }

    return (
        <AuthContext.Provider value={{auth, login, logout}}>
            <App/>
        </AuthContext.Provider>
    )
}