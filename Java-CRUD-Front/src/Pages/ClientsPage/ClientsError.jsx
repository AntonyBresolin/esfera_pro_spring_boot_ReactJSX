// React e dependencias
import { useNavigate, useRouteError } from "react-router-dom"
import { useState } from "react"

// Icones
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons"

// Funções/componentes
import { clientCreate } from "../../functions/clientsDataFunctions"
import { DialogPopup } from "../../Components/DialogPopup"
import { AlertPopup } from "../../Components/AlertPopup"

import { Menu } from "../../Layouts/Menu"

export const ClientsError = () => {
    // Dados necessários
    let error = useRouteError()
    const navigate = useNavigate()
    const [client, setClient] = useState({})

    // Funcionamento de alertas e dialogos
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [openAlert, setOpenAlert] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [functions, setFunctions] = useState(() => {})

    error = error.message === "Failed to fetch"? "Erro ao buscar clientes, verifique se o servidor está rodando" : error.message 

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
        setFunctions(() => () => {setOpenAlert(false); navigate("/", {replace: true})})
        setTitle("success")
        setOpenAlert(true)
    }
    return (
        <div className="flex flex-row w-full font-body overflow-hidden">
            <Menu />
            <div className="w-full h-full">

                {/* Barra de pesquisa */}
                <div className="w-full flex justify-center mb-3 absolute top-[15px] left-1/2 -translate-x-1/2">
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

                {/* Header da tabela de clientes */}
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
                        CPF
                    </div>
                </div>

                {/* Mensagem referente ao erro */}
                <h1 className="text-center text-xl mt-8">{error}</h1> 

                {/* Botão de adicionar cliente */}
                <div title="Adicionar Cliente" onClick={handleCreateClient} className={`${error === "Erro ao buscar clientes, verifique se o servidor está rodando"? "hidden" : "visible"} fixed cursor-pointer bottom-7 right-10 rounded-xl text-white bg-purple-highlight p-2 hover:scale-110 transition ease-in-out duration-200`}>
                    <PlusIcon className=" w-8 h-8 hover:text-amber" />
                </div>
                
                {/* Popups */}
                <DialogPopup open={openDialog} setOpen={setOpenDialog} handleSubmit={functions} client={client} type={title} />
                <AlertPopup open={openAlert} setOpen={setOpenAlert} handleAction={() => functions(client)}  message={message} type={title}  />
        </div>
    </div>
    )
}