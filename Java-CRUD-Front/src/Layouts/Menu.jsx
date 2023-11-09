import { useContext, useState } from 'react';
import { DashboardIcon, ExitIcon, PersonIcon, TrashIcon } from "@radix-ui/react-icons";
import { NavLink, useLocation } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AuthContext } from '../Authenticate';


export const Menu = () => {
    const { logout } = useContext(AuthContext)
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [openMenu, setOpenMenu] = useState(false);


    return ( 
        <aside className={`flex flex-col border-r-2 justify-between ${openMenu? "w-36" : "w-16"}`}>
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
            <div className='p-2 fixed bottom-0'>
                <NavLink title='Exit' to="/login" onClick={logout} className={`flex gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-contrast hover:text-amber transition ease-in-out duration-200 `}>
                    <ExitIcon className= "h-6 w-6" />
                </NavLink>
            </div>
            
        </aside>
    );
}