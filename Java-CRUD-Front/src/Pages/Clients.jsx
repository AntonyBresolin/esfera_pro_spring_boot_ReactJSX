import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import { clientCreate, clientUpdate, updateStatusClient } from "../functions/clientsFunctions";
import { DialogPopup } from "../Components/DialogPopup";
import { AlertPopup } from "../Components/AlertPopup";

import { Menu }  from "../Layouts/Menu";

export const Clients = () => {
    const initialClients = useLoaderData()
    const [Clients, setClients] = useState(initialClients)
    const [functions, setFunctions] = useState( () => {})
    const [openAlert, setOpenAlert] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [message, setMessage] = useState("")
    const [client, setClient] = useState({})
    const [title, setTitle] = useState("")
    
    //Função de remover cliente
    const handleRemoveClient = (client) => {
      setClient(client)
      setMessage(`Você esta prestes a remover o cliente ${client.name}.`)
      setFunctions(() => removeClient)
      setTitle("confirmation")
      setOpenAlert(true)
    }

    const removeClient = (client) => {
      updateStatusClient(client.id, client)
      const newClients = Clients.filter((c) => c.clientData.id !== client.id)
      setClients(newClients)
    }

    //Função de editar cliente
    const handleEditClient = (toEdit) => {
      setClient(toEdit)
      setTitle("edit")
      setFunctions(() => handleSubmitEdit)
      setOpenDialog(true)

    }

    const handleSubmitEdit = async (e, client) => {
      e.preventDefault()
      const data = Object.fromEntries(new FormData(e.target))
      const res = await clientUpdate(data, client)
      setClients(res)
      setMessage(`Cliente ${data.name} editado com sucesso!`)
      setFunctions(() => () => {setOpenAlert(false)})
      setTitle("success")
      setOpenAlert(true)
    }

    //Função de criar cliente
    const handleCreateClient = () => {
      setClient('')
      setTitle("create")
      setFunctions(() => handleSubmitCreate)
      setOpenDialog(true)
    }

    const handleSubmitCreate = async (e) => {
      e.preventDefault()
      let data = Object.fromEntries(new FormData(e.target))
      const res = await clientCreate(data)
      setClients(res)
      setMessage(`Cliente ${data.name} criado com sucesso!`)
      setFunctions(() => () => {setOpenAlert(false)})
      setTitle("success")
      setOpenAlert(true)
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
            <div key={eachClient.clientData.id} className="border-y grid grid-cols-9 items-center p-3 pl-6">
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
              <div className="flex justify-evenly">
                <div title="Remover Cliente" onClick={() => {handleRemoveClient(eachClient.clientData)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                  <TrashIcon className="h-4 w-4 block" />
                </div>
                <div title="Editar Cliente" onClick={() => {handleEditClient(eachClient)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200">
                  <Pencil1Icon className="h-4 w-4 block" />
                </div>
              </div>
            </div>
          ))}

          <div title="Adicionar Cliente" onClick={handleCreateClient} className="fixed cursor-pointer bottom-7 right-10 rounded-xl text-white bg-purple-highlight p-2 hover:scale-110 transition ease-in-out duration-200">
            <PlusIcon className=" w-8 h-8 hover:text-amber" />
          </div>

          <DialogPopup open={openDialog} setOpen={setOpenDialog} handleSubmit={functions} client={client} type={title} />
          <AlertPopup open={openAlert} setOpen={setOpenAlert} handleAction={() => functions(client)}  message={message} type={title}  />

        </div>
      </div>
  );
}
