import { Link } from "react-router-dom";
import { Menu } from "../Layouts/Menu";
import { AuthContext } from "../Authenticate";
import { useContext } from "react";

export const NotFound = () => {
    const location = (window.location.href)
    const data = useContext(AuthContext)
    const User = data.auth.user
    return (
        <div className="flex flex-row w-full font-body">
            <Menu/>
            <div className="w-full h-screen flex flex-col space-y-12 items-center justify-evenly">
                <h1 className="text-5xl font-bold ">
                    404 Not Found
                </h1>
                <p className="text-2xl text-center">
                    A página que você esta procurando não existe ou está em manutenção.<br/>
                    URL escrita: {location}
                </p>
                <Link to="/" className="text-2xl underline" replace >
                    {`Voltar para a ${User !== '' ? "Página inicial" : "Tela de login"}`}
                </Link>
            </div>
        </div>
    );
}