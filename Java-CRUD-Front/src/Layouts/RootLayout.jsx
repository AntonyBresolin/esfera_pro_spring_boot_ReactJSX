// React e dependencias
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";

// Contexto global
import { AuthContext } from "../Authenticate";
import { Dropdown } from "../Components/Dropdown";

export const RootLayout = () => {
    // Dados necessarios do contexto global
    const data = useContext(AuthContext)
    const User = data.auth.user
    const [dropdown, setDropdown] = useState(false);
    const headerRef = useRef(null);


    const handleLogout = () => {
        data.logout()
    }

    const handdleClick = () => {
        setDropdown(dropdown => !dropdown);
    }


    useEffect(() => {
        const closeDropdown = (e) => {
            if (headerRef.current && !headerRef.current.contains(e.target)) {
                setDropdown(false);
            }
        };

        document.addEventListener('mousedown', closeDropdown);

        return () => document.removeEventListener('mousedown', closeDropdown);
    }, []);


    return (
        <>
            <ScrollRestoration />
            {/* Cabeçalho */}
            <header ref={headerRef} className="flex justify-end m-2">
                <div className="flex flex-row cursor-pointer select-none"
                    onClick={() => handdleClick()}>
                    <div className=" font-body text-center ">
                        <h4 className="font-semibold">{User !== '' ? User : "Usuário"}</h4>
                        <p className="text-xs">Grupo 1</p>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <Dropdown open={dropdown} />
            </header>

            {/* Área de exibição referente a todos os filhos do elemento "/" inclusive ele mesmo */}
            <main>
                <Outlet />
            </main>
        </>

    );
}
