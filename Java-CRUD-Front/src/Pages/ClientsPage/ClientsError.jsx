import { useState } from "react"
import { useLoaderData, useNavigate, useRouteError } from "react-router-dom"
import { PlusIcon } from "@radix-ui/react-icons"
import { Menu } from "../../Layouts/Menu"
import { DialogPopup } from "../../Components/DialogPopup"
import { AlertPopup } from "../../Components/AlertPopup"
import { clientCreate } from "../../functions/clientsFunctions"

export const ClientsError = () => {
    let error = useRouteError()
    const navigate = useNavigate()
    const [client, setClient] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [title, setTitle] = useState("")
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
                <h1 className="text-center text-xl mt-8">{error}</h1>
            </div>
            <div title="Adicionar Cliente" onClick={handleCreateClient} className={`${error === "Erro ao buscar clientes, verifique se o servidor está rodando"? "hidden" : "visible"} fixed cursor-pointer bottom-7 right-10 rounded-xl text-white bg-purple-highlight p-2 hover:scale-110 transition ease-in-out duration-200`}>
                <PlusIcon className=" w-8 h-8 hover:text-amber" />
            </div>

            <DialogPopup open={openDialog} setOpen={setOpenDialog} handleSubmit={functions} client={client} type={title} />
            <AlertPopup open={openAlert} setOpen={setOpenAlert} handleAction={() => functions(client)}  message={message} type={title}  />
        </div>
    )
}