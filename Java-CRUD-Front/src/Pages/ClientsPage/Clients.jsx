// React e dependencias
import { Navigate, useLoaderData } from "react-router-dom";
import { useState } from "react";

// Icones
import { MagnifyingGlassIcon, Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

// Funções/componentes
import { clientCreate, clientUpdate, clientsActiveLoader, updateStatusClient } from "../../functions/clientsDataFunctions";
import { DialogPopup } from "../../Components/DialogPopup";
import { AlertPopup } from "../../Components/AlertPopup";

import { Menu }  from "../../Layouts/Menu";

export const Clients = () => {
  // Carregamento de dados do cliente
  const initialClients = useLoaderData()
  const [filteredClients, setFilteredClients] = useState(initialClients)
  const [selectedClients, setSelectedClients] = useState([])
  const [clients, setClients] = useState(initialClients)
  const [client, setClient] = useState({})

  // Funcionamento de alertas e dialogos
  const [title, setTitle] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [message, setMessage] = useState("")
  const [openAlert, setOpenAlert] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [functions, setFunctions] = useState( () => {})

  // Função de filtrar cliente
  const handleFilter = (value) => {
    const filtered = clients.filter((eachClient)=>{
      return eachClient.clientData.name.toLowerCase().startsWith(value.toLowerCase())
    })
    setFilterValue(value)
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

  
  // Função de remover cliente
  const handleRemoveClient = (client) => {
    setClient(client)
    setMessage(`Você esta prestes a remover o cliente ${client.clientData.name}.`)
    setFunctions(() => removeClient)
    setTitle("confirmation")
    setOpenAlert(true)
  }

  const removeClient = (client) => {
    updateStatusClient(client.clientData.id, client)
    const newClients = clients.filter((c) => c.clientData.id !== client.clientData.id)
    const newFilteredClients = filteredClients.filter((c) => c.clientData.id !== client.clientData.id)
    const newSelectedClients = selectedClients.filter((c) => c !== client.clientData.id)
    setClients(newClients)
    setFilteredClients(newFilteredClients)
    setSelectedClients(newSelectedClients)
  }

  const handleMultipleRemoveClient = () => {
    if (selectedClients.length === 0){
      setMessage(`Você não selecionou nenhum cliente.`)
      setFunctions(() => () => {setOpenAlert(false)})
      setTitle("error")
      setOpenAlert(true)
  } else {
      setMessage(`Você esta prestes a remover ${selectedClients.length} clientes.`)
      setFunctions(() => multipleRemoveClient)
      setTitle("confirmation")
      setOpenAlert(true)
  }
  }

  const multipleRemoveClient = () => {
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

  // Função de editar cliente
  const handleEditClient = (toEdit) => {
    setClient(toEdit)
    setTitle("edit")
    setFunctions(() => handleSubmitEdit)
    setOpenDialog(true)

  }

  const handleSubmitEdit = async (e, client) => {
    const data = Object.fromEntries(new FormData(e.target))
    const res = await clientUpdate(data, client)
    const newClient = clients.findIndex((c) => c.clientData.id === res.clientData.id)
    const newFilteredClient = filteredClients.findIndex((c) => c.clientData.id === res.clientData.id)
    setClients((prevData) => {
      prevData[newClient] = res
      return prevData
    })
    setFilteredClients((prevData) => {
      prevData[newFilteredClient] = res
      return prevData
    })
    setMessage(`Cliente ${data.name} editado com sucesso!`)
    setFunctions(() => () => {setOpenAlert(false)})
    setTitle("success")
    setOpenAlert(true)
  }

  // Função de criar cliente
  const handleCreateClient = () => {
    setClient('')
    setTitle("create")
    setFunctions(() => handleSubmitCreate)
    setOpenDialog(true)
  }

  const handleSubmitCreate = async (e) => {
    let data = Object.fromEntries(new FormData(e.target))
    const res = await clientCreate(data)
    setMessage(`Cliente ${data.name} criado com sucesso!`)
    setFunctions(() => () => {setOpenAlert(false)})
    setTitle("success")
    const newClients = await clientsActiveLoader()
    setClients(newClients)
    setFilteredClients(newClients)
    setFilterValue("")
    setOpenAlert(true)
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
            value = {filterValue}
            onChange={(e) => {handleFilter(e.target.value)}}
            />
            <div className="cursor-pointer bg-purple-highlight rounded-r-lg w-1/12 h-full flex items-center justify-center text-white hover:scale-110 transition-all duration-500 hover:text-amber">
              <MagnifyingGlassIcon />
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
          <div title="Remover clientes selecionados" onClick={handleMultipleRemoveClient} className="flex rounded-full bg-gray-200 p-2 cursor-pointer item-center justify-center hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                <TrashIcon className="h-4 w-4 block" />
          </div>
        </div>

        {/* Tabela de clientes */}
        {filteredClients.length === 0 ? <Navigate to="/" /> : filteredClients.map((eachClient, index) => (
          <div onClick={() => {handleDetailsClient(eachClient)}} key={index} className="border-y grid grid-cols-12 items-center p-3 pl-6 hover:bg-gray-100/50 border-l-2 border-gray-100">
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
              <div title="Remover Cliente" onClick={() => {handleRemoveClient(eachClient)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                <TrashIcon className="h-4 w-4 block" />
              </div>
              <div title="Editar Cliente" onClick={() => {handleEditClient(eachClient)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200">
                <Pencil1Icon className="h-4 w-4 block" />
              </div>
            </div>
          </div>
        ))}

        {/* Botão de adicionar cliente */}
        <div title="Adicionar Cliente" onClick={handleCreateClient} className="fixed cursor-pointer bottom-7 right-10 rounded-xl text-white bg-purple-highlight p-2 hover:scale-110 transition ease-in-out duration-200">
          <PlusIcon className=" w-8 h-8 hover:text-amber" />
        </div>

        {/* Popups */}
        <DialogPopup open={openDialog} setOpen={setOpenDialog} handleSubmit={functions} client={client} type={title} />
        <AlertPopup open={openAlert} setOpen={setOpenAlert} handleAction={() => functions(client)}  message={message} type={title} />
      </div>
    </div>
  );
}
