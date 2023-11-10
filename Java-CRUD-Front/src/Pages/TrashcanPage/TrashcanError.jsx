import { useRouteError } from "react-router-dom"
import { Menu } from "../../Layouts/Menu"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export const TrashcanError = () => {
    let error = useRouteError()
    error = error.message === "Failed to fetch"? "Erro ao buscar clientes, verifique se o servidor está rodando" : error.message 
    return (
        <div className="flex flex-row w-full font-body">
            <Menu />
            <div className="w-full h-full">
                <div className="w-full flex justify-evenly mb-3">
                    <div className="w-2/6 flex items-center justify-center">
                        <input className="border border-gray-200 w-11/12 px-2 rounded-l-lg text-lg"
                        type="text"
                        placeholder="Pesquisar"
                        />
                        <div className="cursor-pointer bg-purple-highlight rounded-r-lg w-1/12 h-full flex items-center justify-center">
                            <MagnifyingGlassIcon/>
                        </div>
                    </div>
                </div>
            <div className="border-y grid grid-cols-12  items-center p-3 pl-6 bg-gray-100 text-gray-600">
                <div className="flex items-center gap-8 text-lg col-span-1">
                    <input type="checkbox" className="w-4 h-4"/>
                </div>
                <div className="flex items-center text-lg col-span-3">
                    Nome
                </div>
                <div className="col-span-2">
                    Endereço
                </div>
                <div className="col-span-3">
                    Contato
                </div>
                <div className="col-span-2">
                    CPF/CNPJ
                </div>
            </div>
                <h1 className="text-center text-xl mt-8">{error}</h1>
            </div>
        </div>
    )
}