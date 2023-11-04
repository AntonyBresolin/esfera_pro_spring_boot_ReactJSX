import { useState } from 'react';
import { DashboardIcon, PersonIcon, TrashIcon } from "@radix-ui/react-icons";
import { NavLink, useLocation } from "react-router-dom";

export const Menu = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);

    return ( 
        <aside className="flex flex-col max-w-min h-full">
            <nav className="flex flex-col text-purple-contrast max-w-min p-2 gap-2">
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
        </aside>
    );
}