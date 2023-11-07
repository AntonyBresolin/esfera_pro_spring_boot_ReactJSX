import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";

import { Menu } from "../Layouts/Menu";
import { clientDelete, updateStatusClient } from "../functions/clientsFunctions";
import { ConfirmationPopup } from "../functions/ConfirmationPopup";

export const Trashcan = () => {
    const message = "O cliente será restaurado para a lista de clientes ativos"
    const initialClients = useLoaderData()
    const [Clients, setClients] = useState(initialClients) 

    const handleRestoreClient = (client) => {
        updateStatusClient(client.id, client)
        const newClients = Clients.filter((c) => c.id !== client.id)
        setClients(newClients)
    }

    const handleDeleteClient = (client) => {
        clientDelete(client.id)
        const newClients = Clients.filter((c) => c.id !== client.id)
        setClients(newClients)
    }

    return ( 
        <div className="flex flex-row w-full font-body">
        <Menu />
        <div className="w-full h-full pb-44">
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
                {Clients.map(eachClient => (
                    <div key={eachClient.id} className="border-y grid grid-cols-9 items-center p-3 pl-6">
                        <div className="flex items-center gap-8 text-lg col-span-2">
                            <input type="checkbox"/>
                            {eachClient.name}
                        </div>
                        <div className="col-span-2">
                            {eachClient.address}
                        </div>
                        <div className="col-span-2">
                            {eachClient.contact}
                        </div>
                        <div className="col-span-2">
                            {eachClient.cnpj}
                        </div>
                        <div className="flex justify-evenly">
                            <ConfirmationPopup handleAction={() => handleRestoreClient(eachClient)}  message={message}  />
                            <div title="Deletar Cliente(W.I.P)" onClick={() => {handleDeleteClient(eachClient)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                                <TrashIcon className="h-4 w-4 block" />
                            </div>                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
