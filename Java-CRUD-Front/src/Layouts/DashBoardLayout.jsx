import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const DashBoardLayout = () => {
    return ( 
        <div>
            <ScrollRestoration />
            <header className="flex justify-between m-2">
                <div className="cursor-pointer p-2 max-w-min">
                    <HamburgerMenuIcon className= "h-6 w-6" />
                </div>
                <div className="flex flex-row">
                    <div className="w-14 font-body">
                        <h4 className="font-semibold">User</h4>
                        <p className="text-xs">Grupo 1</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                </div> 
            </header>
            <main>
                <Outlet />
            </main>
        </div>

    );
}