export const clientsLoader = async () => {
    const res = await fetch('http://localhost:8080/api/client/status/active')

  if (!res.ok) {
    throw Error('Could not fetch the list of clients')
  }

  return res.json()

}

export const clientCreate = async (data, clients) => {
  const client = {
    id: clients.length + 1,
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

  return clientsLoader()

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
