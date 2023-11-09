export const clientsActiveLoader = async () => {
  const res = await fetch('http://localhost:8080/api/client-with-contacts-and-address/status/active')
  if (!res.ok) {
    throw Error('Could not fetch the list of clients')
  }
  const data = await res.json()
  let clients = []
  data.map( (eachClient) => {
    let clientData = {
      id: eachClient.client.id,
      name: eachClient.client.name,
      cnpj: eachClient.client.cnpj,
      status: eachClient.client.status
    }
    let contactData = {
        idCell: eachClient.contacts[0].id,
        cell: eachClient.contacts[0].contentContact,
        idEmail: eachClient.contacts[1].id,
        email: eachClient.contacts[1].contentContact
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
  if (!res.ok) {
    throw Error('Could not fetch the list of clients')
  }
  const data = await res.json()
  let clients = []
  data.map( (eachClient) => {
    let clientData = {
      id: eachClient.client.id,
      name: eachClient.client.name,
      cnpj: eachClient.client.cnpj,
      status: eachClient.client.status
    }
    let contactData = {
        idCell: eachClient.contacts[0].id,
        cell: eachClient.contacts[0].contentContact,
        idEmail: eachClient.contacts[1].id,
        email: eachClient.contacts[1].contentContact
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
  throw Error('Could not create the client')
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
  throw Error('Could not create the address')
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
    throw Error('Could not create the contact')
  }
})

return clientsActiveLoader()

}

// Necessario atualizar a api para saber como sera feito:
export const clientUpdate = async (data, client) => {
  let clientData = {
    id: client.clientData.id,
    name: data.name,
    cnpj: data.cnpj,
    status: client.clientData.status
  }
  let contactData = [
    {
      id: client.contactData.idCell,
      type: 1,
      contentContact: data.cell,
      client: clientData
    },
    {
      id: client.contactData.idEmail,
      type: 2,
      contentContact: data.email,
      client: clientData
  }]

  let addressData = {
    id: client.addressData.id,
    cep: data.cep,
    state: data.state,
    city: data.city,
    neighborhood: data.neighborhood,
    street: data.street,
    number: data.number,
    client: clientData
  }

  console.log(addressData)
  console.log(contactData)
  console.log(clientData)

  const updClient = await fetch(`http://localhost:8080/api/client`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(clientData),
  })

  if (!updClient.ok) {
    throw Error('Could not update the client')
  }

  const updAddress = await fetch(`http://localhost:8080/api/address`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(addressData),
  })

  if (!updAddress.ok) {
    throw Error('Could not update the address')
  }

  contactData.map(async (eachCt) => {
    const updContact = await fetch(`http://localhost:8080/api/contact`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(eachCt),
    })
    if (!updContact.ok) {
      throw Error('Could not update the contact')
    }
  })

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
  throw Error('Could not update the status of the client')
}

return upd.json()

}

// Necessario atualizar a api para saber como sera feito:
export const clientDelete = async (id) => {
  const del = await fetch(`http://localhost:8080/api/client-with-contacts-and-address/${id}`, {
    method: 'DELETE',
  }) 

  if (!del.ok) {
    throw Error('Could not delete the client')
  }

  return clientsInactiveLoader()

}