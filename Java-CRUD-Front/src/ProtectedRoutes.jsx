import { useContext } from "react";
import { AuthContext } from "./Authenticate";
import { Navigate, Outlet } from "react-router-dom";


const useAuth = () => {
    const { auth } = useContext(AuthContext)
    return auth.authenticated
}


export const ProtectedRoutes = () => {
    const isAuth = useAuth();

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};
