// React e dependencias
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from 'react';

// Icones
import { HamburgerMenuIcon, PersonIcon, TrashIcon, ExitIcon } from "@radix-ui/react-icons";

// Contexto global
import { AuthContext } from '../Authenticate';


export const Menu = () => {
    // Dados necessarios
    const location = useLocation();
    const { logout } = useContext(AuthContext)

    // Estados
    const [openMenu, setOpenMenu] = useState(false);
    const [activeMenu, setActiveMenu] = useState(location.pathname);


    return ( 
        <aside className={`flex flex-col justify-between z-10 ${openMenu? "w-36" : "w-16"}`}>

            {/* Parte superior do menu, opções no geral */}
            <div className="flex flex-col text-purple-contrast max-w-min p-2 gap-2 fixed top-0">
                <div title='Abri Menu' onClick={() => {openMenu? setOpenMenu(false) : setOpenMenu(true) }} className="cursor-pointer p-2 max-w-min rounded-full hover:bg-purple-contrast hover:text-amber">
                    <HamburgerMenuIcon className= "h-6 w-6" />
                </div>
                
                <nav className="flex flex-col space-y-2">
                    <NavLink title='Clientes' to="/" onClick={() => setActiveMenu('/')} className={`flex gap-2 p-2 rounded-lg cursor-pointer transition ease-in-out duration-200 ${activeMenu === '/' ? 'bg-purple-contrast text-amber' : 'hover:bg-purple-contrast hover:text-amber'}`}>
                        <PersonIcon className= "h-6 w-6" />
                        <h1 className={`select-none ${openMenu ? "visible" : "hidden"}`}>Clientes</h1>
                    </NavLink>
                    <NavLink title='Lixeira' to="/trashcan" onClick={() => setActiveMenu('/trashcan')} className={`flex gap-2 p-2 rounded-lg cursor-pointer transition ease-in-out duration-200 ${activeMenu === '/trashcan' ? 'bg-purple-contrast text-amber' : 'hover:bg-purple-contrast hover:text-amber'}`}>
                        <TrashIcon className= "h-6 w-6" />
                        <h1 className={`select-none ${openMenu ? "visible" : "hidden"}`}>Lixeira</h1>
                    </NavLink>
                </nav>
            </div>

            {/* Parte inferior do menu, botão de logout */}
            <div className='p-2 fixed bottom-0 '>
                <NavLink title='Exit' to="/login" onClick={logout} className={`flex gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-contrast hover:text-amber transition ease-in-out duration-200 `}>
                    <ExitIcon className= "h-6 w-6" />
                    <h1 className={`select-none ${openMenu ? "visible" : "hidden"}`}>Sair</h1>
                </NavLink>
            </div>
        </aside>
    );
}