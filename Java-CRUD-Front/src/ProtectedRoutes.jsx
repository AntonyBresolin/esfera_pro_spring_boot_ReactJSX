// React e dependencias
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";

// Contexto global
import { AuthContext } from "./Authenticate";

// Verificação de autenticação
const useAuth = () => {
    const { auth } = useContext(AuthContext)
    return auth.authenticated
}

export const ProtectedRoutes = () => {
    // Dados necessários
    const location = useLocation()
    const isAuth = useAuth();

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }}/>
    );
};
