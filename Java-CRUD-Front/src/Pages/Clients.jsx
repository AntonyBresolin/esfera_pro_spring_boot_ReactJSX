import { useLoaderData } from "react-router-dom";
import { Menu }  from "../Layouts/Menu";
import { Cross1Icon, Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { desactiveUser } from "../functions/desactiveUser";
import { useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';

export const Clients = () => {
    const url = 'http://localhost:8080/api/client/status/active';
    const initialClients = useLoaderData()
    const [client, setClient] = useState(initialClients);
    const clientsActive = initialClients;

    const handleDesactiveUser = (id) => {
        desactiveUser(id, initialClients, url);
        const newClients = initialClients.filter(client => client.id !== id);
        setClient(newClients);
    }

    const handleAddUser = () => {
        console.log('add user');
    }

    const handleEditUser = () => {
        console.log('edit user');
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
            {clientsActive.map(client => (
                <div key={client.id} className="border-y grid grid-cols-9 items-center p-3 pl-6">
                  <div className="flex items-center gap-8 text-lg col-span-2">
                    <input type="checkbox"/>
                    {client.name}
                  </div>
                  <div className="col-span-2">
                    {client.address}
                  </div>
                  <div className="col-span-2">
                    {client.contact}
                  </div>
                  <div className="col-span-2">
                    {client.cnpj}
                  </div>
                  <div className="flex justify-evenly">
                    <div className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200" >
                      <TrashIcon onClick={() => handleDesactiveUser(client.id)} className="h-4 w-4 block" />
                    </div>
                    <Dialog.Root>
                      <Dialog.Trigger onClick={() => handleEditUser()} className="rounded-full bg-gray-200 p-2 cursor-pointer hover:text-amber hover:bg-purple-contrast hover:scale-110 transition ease-in-out duration-200">
                        <Pencil1Icon className="h-4 w-4 block" />
                      </Dialog.Trigger>

                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50"/>
                        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white
                      text-white shadow w-full max-w-lg overflow-hidden">

                            <div className="flex items-center justify-between p-6 bg-purple-contrast">
                              <Dialog.Title
                               className="text-xl font-semibold">Editar cliente
                              </Dialog.Title>
                              <Dialog.Close>
                                <Cross1Icon className="w-6 h-6 hover:text-amber"/>
                              </Dialog.Close>
                            </div>

                            <ClientsFields client={client}/>

                            <div className="text-right mr-2">
                              <Dialog.Close className="px-6 py-2 mt-6 mb-4 mr-4 border-2 border-black rounded-lg text-lg text-gray-600 hover:text-black transition ease-in-out duration-200">
                                Cancelar
                              </Dialog.Close>
                              <button className="bg-purple-highlight px-9 py-2 mt-6 mb-4 mr-4 border-2 border-purple-highlight rounded-lg text-lg font-semibold hover:text-amber transition ease-in-out duration-200">
                                Save
                              </button>
                            </div>

                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </div>
                </div>
            ))}
            <Dialog.Root>
            <Dialog.Trigger onClick={() => handleAddUser()} className="absolute cursor-pointer bottom-7 right-10 rounded-xl text-white bg-purple-highlight p-2 hover:scale-110 transition ease-in-out duration-200">
              <PlusIcon className=" w-8 h-8 hover:text-amber" />
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50"/>
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-purple-contrast
            text-white p-8 shadow w-full max-w-lg">
                  <h2>Cadastrar cliente</h2>
              </Dialog.Content>
            </Dialog.Portal>
            </Dialog.Root>
            </div>
        </div>
     );
}


function ClientsFields ({client}) {
  console.log(client);
  return (
    <div className="space-y-6 bg-white p-6">
      <div>
        <label className="text-gray-900 font-medium">Nome</label>
        <input 
        autoFocus
        className="text-gray-600 mt-2 py-1.5 px-2 block w-full rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
        type="text"
        defaultValue={client.name !== undefined ? client.name : ''}
        />
      </div>
      <div>
        <label className="text-gray-900 font-medium">Endereço</label>
        <input 
        className="text-gray-600 mt-2 py-1.5 px-2 block w-full rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
        type="text"
        defaultValue={client.address !== undefined ? client.address : ''}
        />
      </div>
      <div>
        <label className="text-gray-900 font-medium">Contato</label>
        <input 
        className="text-gray-600 mt-2 py-1.5 px-2 block w-full rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
        type="text"
        defaultValue={client.contact !== undefined ? client.contact : ''}
        />
      </div>
      <div>
        <label className="text-gray-900 font-medium">CPF/CNPJ</label>
        <input 
        className="text-gray-600 mt-2 py-1.5 px-2 block w-full rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
        type="text"
        defaultValue={client.cnpj !== undefined ? client.cnpj : ''}
        />
      </div>
    </div>
  )
}