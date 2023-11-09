import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";

import { Menu } from "../../Layouts/Menu";
import { clientDelete, updateStatusClient } from "../../functions/clientsFunctions";
import { AlertPopup } from "../../Components/AlertPopup";
import { DialogPopup } from "../../Components/DialogPopup";

export const Trashcan = () => {
    const initialClients = useLoaderData()
    const [Clients, setClients] = useState(initialClients)
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [functions, setFunctions] = useState( () => {})
    const [client, setClient] = useState({})
    const [open, setOpen] = useState(false)


    //Função de detalhes do cliente
    const handleDetailsClient = (client) => {
        setClient(client)
        setTitle("details")
        setFunctions(() => () => {setOpenDialog(false)})
        setOpenDialog(true)
    }

    //Função de restaurar cliente
    const handleRestoreClient = (client) => {
        setClient(client)
        setMessage(`Você esta prestes a restaurar o cliente ${client.name}.`)
        setFunctions(() => restoreClient)
        setOpen(true)
    }

    const restoreClient = (client) => {
        updateStatusClient(client.id, client)
        const newClients = Clients.filter((c) => c.clientData.id !== client.id)
        setClients(newClients)
    }

    //Função de deletar cliente
    const handleDeleteClient = (client) => {
        setClient(client)
        setMessage(`Você esta prestes a deletar permanentemente o cliente ${client.name}.`)
        setFunctions(() => deleteClient)
        setOpen(true)
    }

    const deleteClient = async (client) => {
        const newClients = await clientDelete(client.id)
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
                    <div onClick={() => {handleDetailsClient(eachClient)}} key={eachClient.clientData.id} className="border-y grid grid-cols-9 items-center p-3 pl-6">
                        <div className="flex items-center gap-8 text-lg col-span-2">
                            <input type="checkbox"/>
                            {eachClient.clientData.name}
                        </div>
                        <div className="col-span-2">
                            {`${eachClient.addressData.city} - ${eachClient.addressData.state}`}
                        </div>
                        <div className="col-span-2">
                            {eachClient.contactData.email}
                        </div>
                        <div className="col-span-2">
                            {eachClient.clientData.cnpj}
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className="flex justify-evenly">
                            <div title="Restaurar Cliente" onClick={() => {handleRestoreClient(eachClient.clientData)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                                <ReloadIcon className="h-4 w-4 block" />
                            </div>
                            <div title="Deletar Cliente" onClick={() => {handleDeleteClient(eachClient.clientData)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                                <TrashIcon className="h-4 w-4 block" />
                            </div>                            
                        </div>
                    </div>
                ))}
                <DialogPopup open={openDialog} setOpen={setOpenDialog} handleSubmit={functions} client={client} type={title} />
                <AlertPopup open={open} setOpen={setOpen} handleAction={() => functions(client)}  message={message} type={"confirmation"}  />
            </div>
        </div>
     );
}
