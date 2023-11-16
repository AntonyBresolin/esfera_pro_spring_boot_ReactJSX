import {React, useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Authenticate";

export const Dropdown = ({ open }) => {
    const { logout } = useContext(AuthContext)
    return (
        <div className={`absolute mt-10 bg-white ${open ? "block" : "hidden"} `}>
            <ul>
                <li className="cursor-pointer hover:bg-purple-highlight hover:text-amber p-2 w-24 border-2 select-none">
                    <NavLink to={"/login"} onClick={logout}>Sair </NavLink>
                </li>
            </ul>
        </div>
    );
};
