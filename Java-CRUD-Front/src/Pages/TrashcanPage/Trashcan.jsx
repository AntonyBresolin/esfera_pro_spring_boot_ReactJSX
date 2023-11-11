// React e dependencias
import { Navigate, useLoaderData } from "react-router-dom";
import { useState } from "react";

// Icones
import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";

// Funções/componentes
import { clientDelete, updateStatusClient } from "../../functions/clientsDataFunctions";
import { DialogPopup } from "../../Components/DialogPopup";
import { AlertPopup } from "../../Components/AlertPopup";

import { Menu } from "../../Layouts/Menu";

export const Trashcan = () => {
    // Carregamento de dados do cliente
    const initialClients = useLoaderData()
    const [filteredClients, setFilteredClients] = useState(initialClients)
    const [selectedClients, setSelectedClients] = useState([])
    const [clients, setClients] = useState(initialClients)
    const [client, setClient] = useState({})

    // Funcionamento de alertas e dialogos
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [openAlert, setOpenAlert] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [functions, setFunctions] = useState( () => {})

    // Função de filtrar cliente
    const handleFilter = (value) => {
        const filtered = clients.filter((eachClient)=>{
          return eachClient.clientData.name.toLowerCase().startsWith(value.toLowerCase())
        })
        setFilteredClients(filtered)
    }


    // Função de selecionar cliente
    const checkboxHandler = (e) => {
        let isSelected = e.target.checked;
        let value = parseInt(e.target.value);
    
        if( isSelected ){
          setSelectedClients( [...selectedClients, value ] )
        }else{
          setSelectedClients((prevData)=>{
            return prevData.filter((id)=>{
              return id !== value
            })
        })
        }
      }
    
    const checkAllHandler = () => {
        if( filteredClients.length === selectedClients.length ){
          setSelectedClients( [] )
        }else{
          const selectedIds = filteredClients.map((eachClient)=>{
            return eachClient.clientData.id
          })
          setSelectedClients( selectedIds )
        }
      }

    // Função de detalhes do cliente
    const handleDetailsClient = (client) => {
        setClient(client)
        setTitle("details")
        setFunctions(() => () => {setOpenDialog(false)})
        setOpenDialog(true)
    }

    // Função de restaurar cliente
    const handleRestoreClient = (client) => {
        setClient(client)
        setMessage(`Você esta prestes a restaurar o cliente ${client.clientData.name}.`)
        setFunctions(() => restoreClient)
        setTitle("confirmation")
        setOpenAlert(true)
    }

    const restoreClient = (client) => {
        updateStatusClient(client.clientData.id, client)
        const newClients = clients.filter((c) => c.clientData.id !== client.clientData.id)
        const newFilteredClients = filteredClients.filter((c) => c.clientData.id !== client.clientData.id)
        const newSelectedClients = selectedClients.filter((c) => c !== client.clientData.id)
        setClients(newClients)
        setFilteredClients(newFilteredClients)
        setSelectedClients(newSelectedClients)
    }

    const handleMultipleRestoreClient = () => {
        if (selectedClients.length === 0){
            setMessage(`Você não selecionou nenhum cliente.`)
            setFunctions(() => () => {setOpenDialog(false)})
            setTitle("error")
            setOpenAlert(true)
        } else {
            setMessage(`Você esta prestes a restaurar ${selectedClients.length} clientes.`)
            setFunctions(() => multipleRestoreClient)
            setTitle("confirmation")
            setOpenAlert(true)
        }
    }

    const multipleRestoreClient = () => {
        selectedClients.map((id) => {
            const client = clients.filter((c) => c.clientData.id === id)
            updateStatusClient(id, client[0])
        })
        const newClients = clients.filter((c) => !selectedClients.includes(c.clientData.id))
        const newFilteredClients = filteredClients.filter((c) => !selectedClients.includes(c.clientData.id))
        setClients(newClients)
        setFilteredClients(newFilteredClients)
        setSelectedClients([])
    }

    // Função de deletar cliente
    const handleDeleteClient = (client) => {
        setClient(client)
        setMessage(`Você esta prestes a deletar permanentemente o cliente ${client.name}.`)
        setFunctions(() => deleteClient)
        setTitle("confirmation")
        setOpenAlert(true)
    }

    const deleteClient = async (client) => {
        const res = await clientDelete(client.id)
        const newClients = clients.filter((c) => c.clientData.id !== client.id)
        const newFilteredClients = filteredClients.filter((c) => c.clientData.id !== client.id)
        const newSelectedClients = selectedClients.filter((c) => c !== client.id)
        setClients(newClients)
        setFilteredClients(newFilteredClients)
        setSelectedClients(newSelectedClients)
    }

    const handleMultipleDeleteClient = () => {
        if (selectedClients.length === 0){
            setMessage(`Você não selecionou nenhum cliente.`)
            setFunctions(() => () => {setOpenAlert(false)})
            setTitle("error")
            setOpenAlert(true)
        } else {
            setMessage(`Você esta prestes a deletar permanentemente ${selectedClients.length} clientes.`)
            setFunctions(() => multipleDeleteClient)
            setTitle("confirmation")
            setOpenAlert(true)
        }
    }

    const multipleDeleteClient = async () => {
        selectedClients.map(async (id) => {
            const res = await clientDelete(id)
        })
        const newClients = clients.filter((c) => !selectedClients.includes(c.clientData.id))
        const newFilteredClients = filteredClients.filter((c) => !selectedClients.includes(c.clientData.id))
        setClients(newClients)
        setFilteredClients(newFilteredClients)
        setSelectedClients([])
    }

    return ( 
        <div className="flex flex-row w-full font-body">
            <Menu />
            <div className="w-full h-full pb-44">

                {/* Barra de pesquisa */}
                <div className="w-full flex justify-center mb-3 absolute top-[15px] left-1/2 -translate-x-1/2">
                    <div className="w-2/6 flex items-center justify-center">
                        <input className="border border-gray-200 w-11/12 px-2 rounded-l-lg text-lg"
                        type="text"
                        placeholder="Pesquisar"
                        onChange={(e) => {handleFilter(e.target.value)}}
                        />
                        <div className="cursor-pointer bg-purple-highlight rounded-r-lg w-1/12 h-full flex items-center justify-center">
                            <MagnifyingGlassIcon/>
                        </div>
                    </div>
                </div>

                {/* Header da tabela de clientes */}
                <div className="border-y grid grid-cols-12  items-center p-3 pl-6 bg-gray-100 text-gray-600">
                    <div className="flex items-center gap-8 text-lg col-span-1">
                        <input type="checkbox" onClick={checkAllHandler} className="w-4 h-4"/>
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
                    <div className="flex justify-evenly">
                        <div title="Restaurar clientes selecionados" onClick={handleMultipleRestoreClient} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                            <ReloadIcon className="h-4 w-4 block" />
                        </div>
                        <div title="Deletar clientes selecionados" onClick={handleMultipleDeleteClient} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                            <TrashIcon className="h-4 w-4 block" />
                        </div>                            
                    </div>
                </div>

                {/* Tabela de clientes */}
                {filteredClients.length === 0 ? <Navigate to="/trashcan" /> : filteredClients.map((eachClient, index) => (
                    <div onClick={() => {handleDetailsClient(eachClient)}} key={index} className="border-y grid grid-cols-12 items-center p-3 pl-6 hover:bg-gray-100/50">
                        <label onClick={(e) => e.stopPropagation()} className="flex items-center text-lg col-span-1">
                            <input type="checkbox" checked={ selectedClients.includes( eachClient.clientData.id ) } value={eachClient.clientData.id} onChange={checkboxHandler} className="w-4 h-4"/>
                        </label>
                        <div className="flex items-center text-lg col-span-3">
                            {eachClient.clientData.name}
                        </div>
                        <div className="col-span-2">
                            {`${eachClient.addressData.city} - ${eachClient.addressData.state}`}
                        </div>
                        <div className="col-span-3">
                            {eachClient.contactData.email}
                        </div>
                        <div className="col-span-2">
                            {eachClient.clientData.cnpj}
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className="flex justify-evenly">
                            <div title="Restaurar Cliente" onClick={() => {handleRestoreClient(eachClient)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                                <ReloadIcon className="h-4 w-4 block" />
                            </div>
                            <div title="Deletar Cliente" onClick={() => {handleDeleteClient(eachClient.clientData)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                                <TrashIcon className="h-4 w-4 block" />
                            </div>                            
                        </div>
                    </div>
                ))}
                
                {/* Popups */}
                <DialogPopup open={openDialog} setOpen={setOpenDialog} handleSubmit={functions} client={client} type={title} />
                <AlertPopup open={openAlert} setOpen={setOpenAlert} handleAction={() => functions(client)}  message={message} type={title}  />
            </div>
        </div>
     );
}
