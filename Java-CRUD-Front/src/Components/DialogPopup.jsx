import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';


export const DialogPopup = ({open, setOpen, handleSubmit, client, type}) => {
    let title = ""
    if (type === "create") {
        title = "Cadastrar cliente"
    } else if (type === "edit") {
        title = "Editar cliente"
    } else if (type === "details") {
        title = "Detalhes do cliente"
    }

    const submit = async (e) => {
      await handleSubmit(e, client)
      setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-[overlay-show_200ms] data-[state=closed]:animate-[overlay-hide_200ms]"/>
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white
        text-white shadow w-full max-w-2xl overflow-hidden data-[state=open]:animate-[dialog-show_200ms] data-[state=closed]:animate-[dialog-hide_200ms] ">

            <div className="flex items-center justify-between p-6 bg-purple-contrast">
              <Dialog.Title
                className="text-xl font-semibold">{title}
              </Dialog.Title>
              <Dialog.Close>
                <Cross1Icon className="w-6 h-6 hover:text-amber"/>
              </Dialog.Close>
            </div>

            <form onSubmit={submit}>
              <ClientsFields client={client}/>
              <div className="text-right mr-2">
                <Dialog.Close className="px-6 py-2 mt-6 mb-4 mr-4 border-2 border-black rounded-lg text-lg text-gray-600 hover:text-black transition ease-in-out duration-200">
                  Cancelar
                </Dialog.Close>
                <button  className="bg-purple-highlight px-9 py-2 mt-6 mb-4 mr-4 border-2 border-purple-highlight rounded-lg text-lg font-semibold hover:text-amber hover:scale-105 transition ease-in-out duration-200">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
}

function ClientsFields ({client}) {
  if (client === '') {
    client = {
      clientData: {
        name: '',
        cnpj: ''
      },
      contactData: {
        cell: '',
        email: ''
      },
      addressData: {
        cep: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: ''
      }
    }
  }
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
          defaultValue={client.clientData.name}
          name="name"
          required
          />
        </div>
        <div className="w-full">
          <label className="text-gray-900 font-medium">CPF/CNPJ</label>
          <input
          className="text-gray-600 mt-2 py-1.5 px-2 block w-11/12 rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
          type="number"
          defaultValue={client.clientData.cnpj}
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
          type="number"
          defaultValue={client.contactData.cell}
          name="cell"
          required
          />
        </div>
        <div className="w-full">
          <label className="text-gray-900 font-medium">E-mail</label>
          <input
          className="text-gray-600 mt-2 py-1.5 px-2 block w-11/12 rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
          type="email"
          defaultValue={client.contactData.email}
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
            type="number"
            defaultValue={client.addressData.cep}
            name="cep"
            required
            />
          </div>
          <div className="w-2/6">
            <label className="text-gray-900 font-medium">Cidade</label>
            <input
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
            type="text"
            defaultValue={client.addressData.city}
            name="city"
            required
            />
          </div>
          <div className="w-2/6">
            <label className="text-gray-900 font-medium">Estado</label>
            <select 
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow" 
            defaultValue={client.addressData.state}
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
            defaultValue={client.addressData.neighborhood}
            name="neighborhood"
            required
            />
          </div>
          <div className="w-2/6 mt-4">
            <label className="text-gray-900 font-medium">Rua</label>
            <input
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
            type="text"
            defaultValue={client.addressData.street}
            name="street"
            required
            />
          </div>
          <div className="w-2/6 mt-4">
            <label className="text-gray-900 font-medium">Número</label>
            <input
            className="w-5/6 text-gray-600 mt-2 py-1.5 px-2 block rounded-md border border-gray-300 shadow focus:border-purple-contrast focus:text-gray-800"
            type="number"
            defaultValue={client.addressData.number}
            name="number"
            required
            />
          </div>
        </div>
      </div>

    </div>
  )
}
