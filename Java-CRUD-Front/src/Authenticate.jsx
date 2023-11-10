// React
import { createContext, useState } from "react"

import App from "./App"

// Criação do contexto global
export const AuthContext = createContext()

export const Authenticate = () => {
    // Estado global de autenticação buscando no localStorage
    const [auth, setAuth] = useState(
        localStorage.getItem('authToken') 
        ? JSON.parse(localStorage.getItem('authToken')) 
        : {user: "", authenticated: false}
    )

    // Função de login
    const login = async (data) => {
        // Verificação sem dados
        if (data.username === "" || data.password === "") {
            return false
        }

        // Verificação com dados
        // Busca de dados no backend
        const res = await fetch(`http://localhost:8080/api/user/${data.username}/${data.password}`)

        // Verificação de dados
        if (res.ok) {
            const resData = await res.json()
            setAuth({user: resData.name, authenticated: true})
            localStorage.setItem('authToken', JSON.stringify({user: resData.name, authenticated: true}))
            return true
        } else {
            return false
        }
    }

    // Função de logout
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