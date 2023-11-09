import { useRouteError } from "react-router-dom"
import { Menu } from "../../Layouts/Menu"

export const TrashcanError = () => {
    const error = useRouteError()
    return (
        <div className="flex flex-row w-full font-body">
            <Menu />
            <div className="w-full h-full">
                <div className="border-y grid grid-cols-9  items-center p-3 pl-6 bg-gray-100 text-gray-600">
                <div className="flex items-center gap-8 text-lg col-span-2">
                    <input type="checkbox"/>
                    Nome
                </div>
                <div className="col-span-2">
                    Endereço
                </div>
                <div className="col-span-2">
                    Contato
                </div>
                <div className="col-span-2">
                    CPF/CNPJ
                </div>
                </div>
                <h1 className="text-center text-xl mt-8">{error.message}</h1>
            </div>
        </div>
    )
}