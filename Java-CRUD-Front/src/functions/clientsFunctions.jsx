// {
//   "client": {
//       "id": 4,
//       "name": "Lucas",
//       "cnpj": "123456789",
//       "status": "Active"
//   },
//   "address": {
//       "id": 1,
//       "cep": "69966996",
//       "state": "PR",
//       "city": "Toledo",
//       "neighborhood": "BPK",
//       "street": "Rua dos Bobos",
//       "number": "69",
//       "client": {
//           "id": 4,
//           "name": "Lucas",
//           "cnpj": "123456789",
//           "status": "Active"
//       }
//   },
//   "contacts": [
//       {
//           "id": 2,
//           "type": 1,
//           "contentContact": "999999999",
//           "client": {
//               "id": 4,
//               "name": "Lucas",
//               "cnpj": "123456789",
//               "status": "Active"
//           }
//       }
//   ]
// }

export const clientsActiveLoader = async () => {
    const res = await fetch('http://localhost:8080/api/client/status/active')
    const data = await res.json()
    let clients = []
    data.map(async (client) => {
      const id = client.id
      const allData = await grabData(id)
      let clientData = {
        id: allData.client.id,
        name: allData.client.name,
        cnpj: allData.client.cnpj,
        status: allData.client.status
      }
      let contactData = {
          cell: allData.contacts[0].contentContact,
          email: allData.contacts[1].contentContact
        }
      let addressData = {
        cep: allData.address.cep,
        state: allData.address.state,
        city: allData.address.city,
        neighborhood: allData.address.neighborhood,
        street: allData.address.street,
        number: allData.address.number
      }
      clients.push({clientData, contactData, addressData})
    })

  if (!res.ok) {
    throw Error('Could not fetch the list of clients')
  }

  return clients
}


export const clientsInactiveLoader = async () => {
  const res = await fetch('http://localhost:8080/api/client/status/inactive')
  const data = await res.json()
  let clients = []
  data.map(async (client) => {
    const id = client.id
    const allData = await grabData(id)
    let clientData = {
      id: allData.client.id,
      name: allData.client.name,
      cnpj: allData.client.cnpj,
      status: allData.client.status
    }
    let contactData = {
        cell: allData.contacts[0].contentContact,
        email: allData.contacts[1].contentContact
      }
    let addressData = {
      cep: allData.address.cep,
      state: allData.address.state,
      city: allData.address.city,
      neighborhood: allData.address.neighborhood,
      street: allData.address.street,
      number: allData.address.number
    }
    clients.push({clientData, contactData, addressData})
  })

if (!res.ok) {
  throw Error('Could not fetch the list of clients')
}

return clients
}


export const clientCreate = async (data, clients) => {
  const id =clients.length + 1
  const client = {
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
    complement: "nothing",
    client
  }	

  const contact = {
    name: data.cell,
    type: 1,
    contentContact: data.email,
    client
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

  const ct = await fetch('http://localhost:8080/api/contact', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(contact),
  })

  if (!ct.ok) {
    throw Error('Could not create the contact')
  }

  return clientsActiveLoader()

}

// Necessario atualizar a api para saber como sera feito:
export const clientUpdate = async (data, clients) => {
  const id =clients.length
  const client = {
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
    complement: "nothing",
    client
  }	

  const contact = {
    name: data.cell,
    type: 1,
    contentContact: data.email,
    client
  }

  const c = await fetch(`http://localhost:8080/api/client/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(client),
  })

  const a = await fetch(`http://localhost:8080/api/address/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(address),
  })


  const ct = await fetch(`http://localhost:8080/api/contact/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(contact),
  })

  if (!c.ok || !a.ok || !ct.ok) {
    throw Error('Could not update the client')
  }


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
  const del = await fetch(`http://localhost:8080/api/client/${id}`, {
    method: 'DELETE',
  }) 

  if (!del.ok) {
    throw Error('Could not delete the client')
  }

  return del.json()
}

export const grabData = async (id) => {
  const res = await fetch(`http://localhost:8080/api/client-with-contacts-and-address/${id}`)
  const data = await res.json()
  
  if (!res.ok) {
    throw Error('Could not fetch the client of id: ' + id)
  }

  return data


}