import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { Cross1Icon, Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import * as Dialog from '@radix-ui/react-dialog';

import { clientCreate, clientUpdate, updateStatusClient } from "../functions/clientsFunctions";
import { ConfirmationPopup } from "../functions/ConfirmationPopup";

import { Menu }  from "../Layouts/Menu";

/* 
client format:
{
  "name": "Lucas",
  "cnpj": "123456789"
}
address format:
{
  "cep": "69966996",
  "state": "PR",
  "city": "Toledo",
  "neighborhood": "BPK",
  "street": "Rua dos Bobos",
  "number": "69",
  "complement": "nothing",
  "client": {
      "id": 1,
      "name": "Lucas",
      "cnpj": "123456789",
      "status": "Active"
  }
}

contact format:
{
  "name": "phone",
  "type": 1,
  "contentContact": "999999999",
  "client": {
      "id": 1,
      "name": "Lucas",
      "cnpj": "123456789",
      "status": "Active"
  }
}
*/ 
export const Clients = () => {
    const initialClients = useLoaderData()
    const [Clients, setClients] = useState(initialClients)
    const [functions, setFunctions] = useState( () => {})
    const [open, setOpen] = useState(false)
    const [openC, setOpenC] = useState(false)
    const [openE, setOpenE] = useState(false)
    const [message, setMessage] = useState("")
    const [client, setClient] = useState({})

    const handleRemoveClient = (client) => {
      setClient(client)
      setMessage(`Você esta prestes a remover o cliente ${client.name}.`)
      setFunctions(() => removeClient)
      setOpen(true)
    }

    const removeClient = (client) => {
      updateStatusClient(client.id, client)
      const newClients = Clients.filter((c) => c.id !== client.id)
      setClients(newClients)
    }

    const handleEditClient = (toEdit) => {
      setClient(toEdit)
      setOpenE(true)
    }


    // Necessario atualizar a api para saber como sera feito:
    const handleSubmitEdit = async (e) => {
      e.preventDefault()
      let data = Object.fromEntries(new FormData(e.target))
      // const res = await clientUpdate(data, Clients)
      // setClients(res)
      setOpenE(false)
    }
    const handleSubmitCreate = async (e) => {
      e.preventDefault()
      let data = Object.fromEntries(new FormData(e.target))
      const res = await clientCreate(data, Clients)
      setClients(res)
      setOpenC(false)
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
                <div title="Remover Cliente" onClick={() => {handleRemoveClient(eachClient)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                  <TrashIcon className="h-4 w-4 block" />
                </div>
                <div title="Editar Cliente(W.I.P)" onClick={() => {handleEditClient(eachClient)}} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200">
                  <Pencil1Icon className="h-4 w-4 block" />
                </div>

              </div>
            </div>
          ))}

          <ConfirmationPopup open={open} setOpen={setOpen} handleAction={() => functions(client)}  message={message}  />


          {/* Dialog de Edit */}
            <Dialog.Root open={openE} onOpenChange={setOpenE}>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-[overlay-show_200ms] data-[state=closed]:animate-[overlay-hide_200ms]"/>
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white
              text-white shadow w-full max-w-2xl overflow-hidden data-[state=open]:animate-[dialog-show_200ms] data-[state=closed]:animate-[dialog-hide_200ms] ">
    
                  <div className="flex items-center justify-between p-6 bg-purple-contrast">
                    <Dialog.Title
                      className="text-xl font-semibold">Editar cliente
                    </Dialog.Title>
                    <Dialog.Close>
                      <Cross1Icon className="w-6 h-6 hover:text-amber"/>
                    </Dialog.Close>
                  </div>

                  <form onSubmit={handleSubmitEdit}>
                    <ClientsFields client={client}/>
                    <div className="text-right mr-2">
                      <Dialog.Close className="px-6 py-2 mt-6 mb-4 mr-4 border-2 border-black rounded-lg text-lg text-gray-600 hover:text-black transition ease-in-out duration-200">
                        Cancelar
                      </Dialog.Close>
                      <button className="bg-purple-highlight px-9 py-2 mt-6 mb-4 mr-4 border-2 border-purple-highlight rounded-lg text-lg font-semibold hover:text-amber hover:scale-105 transition ease-in-out duration-200">
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          
          {/* Dialog de criação */}
            <Dialog.Root open={openC} onOpenChange={setOpenC}>
              <Dialog.Trigger title="Adicionar Cliente" className="fixed cursor-pointer bottom-7 right-10 rounded-xl text-white bg-purple-highlight p-2 hover:scale-110 transition ease-in-out duration-200">
                <PlusIcon className=" w-8 h-8 hover:text-amber" />
              </Dialog.Trigger>
    
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-[overlay-show_200ms] data-[state=closed]:animate-[overlay-hide_200ms]"/>
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white
              text-white shadow w-full max-w-2xl overflow-hidden data-[state=open]:animate-[dialog-show_200ms] data-[state=closed]:animate-[dialog-hide_200ms] ">
    
                  <div className="flex items-center justify-between p-6 bg-purple-contrast">
                    <Dialog.Title
                      className="text-xl font-semibold">Cadastrar cliente
                    </Dialog.Title>
                    <Dialog.Close>
                      <Cross1Icon className="w-6 h-6 hover:text-amber"/>
                    </Dialog.Close>
                  </div>
    
                  <form onSubmit={handleSubmitCreate}>
                    <ClientsFields client={client}/>
                    <div className="text-right mr-2">
                      <Dialog.Close className="px-6 py-2 mt-6 mb-4 mr-4 border-2 border-black rounded-lg text-lg text-gray-600 hover:text-black transition ease-in-out duration-200">
                        Cancelar
                      </Dialog.Close>
                      <button className="bg-purple-highlight px-9 py-2 mt-6 mb-4 mr-4 border-2 border-purple-highlight rounded-lg text-lg font-semibold hover:text-amber hover:scale-105 transition ease-in-out duration-200">
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
        </div>
      </div>
  );
}



function ClientsFields ({client}) {
  return (
    <div className="space-y-6 bg-white p-6">

      <h1 className="text-black text-xl font-semibold">Dados básicos</h1>
      <div className="flex justify-evenly">
        <div className="w-full">
          <label className="text-gray-900 font-medium">Nome</label>
          <input 
          autoFocus
          className="text-gray-600 mt-2 py-1.5 px-2 block w-11/12 rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
          type="text"
          defaultValue={client.name}
          name="name"
          required
          />
        </div>
        <div className="w-full">
          <label className="text-gray-900 font-medium">CPF/CNPJ</label>
          <input
          className="text-gray-600 mt-2 py-1.5 px-2 block w-11/12 rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
          type="text"
          defaultValue={client.cnpj}
          name="cnpj"
          required
          />
        </div>
      </div>

      <h1 className="text-black text-xl font-semibold">Informações para contato</h1>
      <div className="flex justify-evenly">
        <div className="w-full">
          <label className="text-gray-900 font-medium">Celular</label>
          <input
          className="text-gray-600 mt-2 py-1.5 px-2 block w-11/12 rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
          type="text"
          // defaultValue={}
          name="cell"
          required
          />
        </div>
        <div className="w-full">
          <label className="text-gray-900 font-medium">E-mail</label>
          <input
          className="text-gray-600 mt-2 py-1.5 px-2 block w-11/12 rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
          type="email"
          // defaultValue={}
          name="email"
          required
          />
        </div>
      </div>

      <h1 className="text-black text-xl font-semibold">Endereço</h1>
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-2/6">
            <label className="text-gray-900 font-medium">CEP</label>
            <input
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
            type="text"
            // defaultValue={}
            name="cep"
            required
            />
          </div>
          <div className="w-2/6">
            <label className="text-gray-900 font-medium">Cidade</label>
            <input
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
            type="text"
            // defaultValue={}
            name="city"
            required
            />
          </div>
          <div className="w-2/6">
            <label className="text-gray-900 font-medium">Estado</label>
            <select 
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow" 
            // defaultValue={}
            name="state"
            required
            >
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
          </select>
          </div>
        </div>
        <div className="flex">
          <div className="w-2/6 mt-4">
            <label className="text-gray-900 font-medium">Bairro</label>
            <input
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
            type="text"
            // defaultValue={}
            name="neighborhood"
            required
            />
          </div>
          <div className="w-2/6 mt-4">
            <label className="text-gray-900 font-medium">Rua</label>
            <input
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
            type="text"
            // defaultValue={}
            name="street"
            required
            />
          </div>
          <div className="w-2/6 mt-4">
            <label className="text-gray-900 font-medium">Número</label>
            <input
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
            type="number"
            // defaultValue={}
            name="number"
            required
            />
          </div>
        </div>
      </div>

    </div>
  )
}
