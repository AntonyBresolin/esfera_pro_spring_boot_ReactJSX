export const clientsActiveLoader = async () => {
  const res = await fetch('http://localhost:8080/api/client-with-contacts-and-address/status/active')
  if (res.status === 404) {
    throw Error('Não foram encontrados clientes ativos')
  }
  if (!res.ok) {
    throw Error('Erro ao buscar clientes, verifique se o servidor está rodando')
  }
  const data = await res.json()
  let clients = []
  data.map( (eachClient) => {
    let cell = eachClient.contacts.filter((contact) => contact.type == 1)
    let email = eachClient.contacts.filter((contact) => contact.type == 2)
    let clientData = {
      id: eachClient.client.id,
      name: eachClient.client.name,
      cnpj: eachClient.client.cnpj,
      status: eachClient.client.status
    }
    let contactData = {
        idCell: cell[0].id,
        cell: cell[0].contentContact,
        idEmail: email[0].id,
        email: email[0].contentContact
    }
    let addressData = {
      id: eachClient.address.id,
      cep: eachClient.address.cep,
      state: eachClient.address.state,
      city: eachClient.address.city,
      neighborhood: eachClient.address.neighborhood,
      street: eachClient.address.street,
      number: eachClient.address.number
    }
    clients.push({clientData, contactData, addressData})
  })
  
  
  return clients
}

export const clientsInactiveLoader = async () => {
  const res = await fetch('http://localhost:8080/api/client-with-contacts-and-address/status/inactive')
  if (res.status === 404) {
    throw Error('Não foram encontrados clientes inativos')
  }
  if (!res.ok) {
    throw Error('Erro ao buscar clientes, verifique se o servidor está rodando')
  }
  const data = await res.json()
  let clients = []
  data.map( (eachClient) => {
    let cell = eachClient.contacts.filter((contact) => contact.type == 1)
    let email = eachClient.contacts.filter((contact) => contact.type == 2)
    let clientData = {
      id: eachClient.client.id,
      name: eachClient.client.name,
      cnpj: eachClient.client.cnpj,
      status: eachClient.client.status
    }
    let contactData = {
        idCell: cell[0].id,
        cell: cell[0].contentContact,
        idEmail: email[0].id,
        email: email[0].contentContact
    }
    let addressData = {
      id: eachClient.address.id,
      cep: eachClient.address.cep,
      state: eachClient.address.state,
      city: eachClient.address.city,
      neighborhood: eachClient.address.neighborhood,
      street: eachClient.address.street,
      number: eachClient.address.number
    }
  clients.push({clientData, contactData, addressData})
})


return clients
}


export const clientCreate = async (data) => {

  let client = {
    name: data.name,
    cnpj: data.cnpj,
  }

  const c = await fetch('http://localhost:8080/api/client', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(client),
  })

  if (!c.ok) {
    throw Error('Não foi possivel criar o cliente')
  }

  const dataClients = await fetch('http://localhost:8080/api/client')
  const clients = await dataClients.json()
  const id = clients[clients.length - 1].id
  client = {
    id: id,
    name: data.name,
    cnpj: data.cnpj,
    status: "Active"
  }

  const address = {
    cep: data.cep,
    state: data.state,
    city: data.city,
    neighborhood: data.neighborhood,
    street: data.street,
    number: data.number,
    client
  }	

  const a = await fetch('http://localhost:8080/api/address', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(address),
  })

  if (!a.ok) {
    throw Error('Não foi possivel criar o endereço')
  }

  const contact = [
    {
    type: 1,
    contentContact: data.cell,
    client
    },
    {
      type: 2,
      contentContact: data.email,
      client
    }
  ]

  contact.map(async (eachCt) => {
    const ct = await fetch('http://localhost:8080/api/contact', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(eachCt),
    })

    if (!ct.ok) {
      throw Error('Não foi possivel criar o contato')
    }
  })

  return true

}

export const clientUpdate = async (data, originData) => {
  let client = {
      id: originData.clientData.id,
      name: data.name,
      cnpj: data.cnpj,
      status: originData.clientData.status
    }
  
  let contacts = [
      {
        id: originData.contactData.idCell,
        type: 1,
        contentContact: data.cell,
        client: client
      },
      {
        id: originData.contactData.idEmail,
        type: 2,
        contentContact: data.email,
        client: client
    }
  ]
  

  let address = {
        id: originData.addressData.id,
        cep: data.cep,
        state: data.state,
        city: data.city,
        neighborhood: data.neighborhood,
        street: data.street,
        number: data.number,
        client: client
      }
  

  const allData = {
    client,
    contacts,
    address
  }
  const upd = await fetch(`http://localhost:8080/api/client-with-contacts-and-address/${originData.clientData.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(allData),
  })

  if (!upd.ok) {
    throw Error('Não foi possivel atualizar o cliente')
  }

  return clientsActiveLoader()
}


export const updateStatusClient = async (id, client) => {
const upd = await fetch(`http://localhost:8080/api/client/${id}/status/${client.status === "Active" ? "inactive" : "active"}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(client),
})

if (!upd.ok) {
  throw Error('Não foi possivel atualizar o status do cliente')
}

return upd.json()

}


export const clientDelete = async (id) => {
  const del = await fetch(`http://localhost:8080/api/client-with-contacts-and-address/${id}`, {
    method: 'DELETE',
  }) 

  if (!del.ok) {
    throw Error('Não foi possivel deletar o cliente')
  }

  return clientsInactiveLoader()

}