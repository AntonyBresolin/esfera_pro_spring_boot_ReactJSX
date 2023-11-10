// Função para buscar todos os clientes ativos
export const clientsActiveLoader = async () => {
  const res = await fetch('http://localhost:8080/api/client-with-contacts-and-address/status/active')
  
  // Se não encontrar nenhum cliente ativo ou dar faila no fetch, retorna um erro que será tratado no componente
  if (res.status === 404) {
    throw Error('Não foram encontrados clientes ativos')
  }
  if (!res.ok) {
    throw Error('Erro ao buscar clientes, verifique se o servidor está rodando')
  }

  // Se encontrar clientes ativos, retorna um array com os dados de cada cliente
  const data = await res.json()
  let clients = []
  data.map((eachClient) => {
    let clientData = {
      id: eachClient.client.id,
      name: eachClient.client.name,
      cnpj: eachClient.client.cnpj,
      status: eachClient.client.status
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
    let cell = eachClient.contacts.filter((contact) => contact.type === 1)
    let email = eachClient.contacts.filter((contact) => contact.type === 2)
    let contactData =  {
        idCell: cell[0].id,
        cell: cell[0].contentContact,
        idEmail: email[0].id,
        email: email[0].contentContact
    }
    clients.push({clientData, contactData, addressData})
  })

  // Ordena os clientes por ordem alfabética
  clients.sort((a, b) => {
    const nomeA = a.clientData.name.toUpperCase()
    const nomeB = b.clientData.name.toUpperCase()

    if (nomeA < nomeB) {
      return -1
    }
    if (nomeA > nomeB) {
      return 1
    }
    return 0
  })
  
  return clients
}

// Função para buscar todos os clientes inativos
export const clientsInactiveLoader = async () => {
  const res = await fetch('http://localhost:8080/api/client-with-contacts-and-address/status/inactive')
  
  // Se não encontrar nenhum cliente inativo ou dar faila no fetch, retorna um erro que será tratado no componente
  if (res.status === 404) {
    throw Error('Não foram encontrados clientes inativos')
  }
  if (!res.ok) {
    throw Error('Erro ao buscar clientes, verifique se o servidor está rodando')
  }

  // Se encontrar clientes inativos, retorna um array com os dados de cada cliente
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

// Ordena os clientes por ordem alfabética
clients.sort((a, b) => {
  const nomeA = a.clientData.name.toUpperCase()
  const nomeB = b.clientData.name.toUpperCase()

  if (nomeA < nomeB) {
    return -1
  }
  if (nomeA > nomeB) {
    return 1
  }
  return 0
})

return clients
}
  
// Função para criar cliente
export const clientCreate = async (data) => {
  // Cria inicialmente o cliente
  let client = {
    name: data.name,
    cnpj: data.cnpj,
  }

  // Envia o cliente para api, verifica por erros e pega ele denovo com seu id
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

  // Cria o endereço e contato com o id do cliente criado
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

  // Envia o endereço e contato para api e verifica por erros 
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

//Função para atualizar cliente
export const clientUpdate = async (data, originData) => {

  // Cria o cliente, endereço e contato com os dados atualizados
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
  
  // Junta tudo em um mesmo objeto e os envia para API verificando por erros
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

  // Retorna os dados atualizados para o componente atualizar o front
  return {
    clientData: client, 
    contactData: {
    idCell: originData.contactData.idCell,
    cell: data.cell,
    idEmail: originData.contactData.idEmail,
    email: data.email
    }, 
    addressData: address
  }
}

// Função para alterar o status do cliente de ativo para inativo e vice-versa
export const updateStatusClient = async (id, client) => {

  // Envia o cliente com o status alterado para API verificando por erros
  const upd = await fetch(`http://localhost:8080/api/client/${id}/status/${client.clientData.status === "Active" ? "inactive" : "active"}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(client),
  })
  if (!upd.ok) {
    throw Error('Não foi possivel atualizar o status do cliente')
  }

  return true

}

// Função para deletar cliente
export const clientDelete = async (id) => {

  // Envia o id do cliente para API deletarverificando por erros
  const del = await fetch(`http://localhost:8080/api/client-with-contacts-and-address/${id}`, {
    method: 'DELETE',
  }) 

  if (!del.ok) {
    throw Error('Não foi possivel deletar o cliente')
  }

  return true

}