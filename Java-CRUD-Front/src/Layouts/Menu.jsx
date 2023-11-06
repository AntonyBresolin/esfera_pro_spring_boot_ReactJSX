import { useState } from 'react';
import { DashboardIcon, PersonIcon, TrashIcon } from "@radix-ui/react-icons";
import { NavLink, useLocation } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";


export const Menu = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);

    return ( 
        <aside className="flex flex-col w-16 border-r-2">
            <div className="flex flex-col text-purple-contrast max-w-min p-2 gap-2 fixed top-0">
                <div title='(W.I.P)' className="cursor-pointer p-2 max-w-min rounded-full hover:bg-purple-contrast hover:text-amber">
                    <HamburgerMenuIcon className= "h-6 w-6" />
                </div>
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/dashboard" onClick={() => setActiveMenu('/dashboard')} className={`flex gap-2 p-2 rounded-lg cursor-pointer transition ease-in-out duration-200 ${activeMenu === '/dashboard' ? 'bg-purple-contrast text-amber' : 'hover:bg-purple-contrast hover:text-amber'}`}>
                        <DashboardIcon className= "h-6 w-6" />
                    </NavLink>
                    <NavLink to="/clients" onClick={() => setActiveMenu('/clients')} className={`flex gap-2 p-2 rounded-lg cursor-pointer transition ease-in-out duration-200 ${activeMenu === '/clients' ? 'bg-purple-contrast text-amber' : 'hover:bg-purple-contrast hover:text-amber'}`}>
                        <PersonIcon className= "h-6 w-6" />
                    </NavLink>
                    <NavLink to="/trashcan" onClick={() => setActiveMenu('/trashcan')} className={`flex gap-2 p-2 rounded-lg cursor-pointer transition ease-in-out duration-200 ${activeMenu === '/trashcan' ? 'bg-purple-contrast text-amber' : 'hover:bg-purple-contrast hover:text-amber'}`}>
                        <TrashIcon className= "h-6 w-6" />
                    </NavLink>
                </nav>
            </div>
            
        </aside>
    );
}