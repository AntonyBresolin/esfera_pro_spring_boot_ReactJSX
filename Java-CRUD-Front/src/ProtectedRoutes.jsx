import { useContext } from "react";
import { AuthContext } from "./Authenticate";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const useAuth = () => {
    const { auth } = useContext(AuthContext)
    return auth.authenticated
}


export const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    return (
        <Outlet />
    )
};
