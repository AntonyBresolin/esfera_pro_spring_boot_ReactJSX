export const clientsLoader = async () => {
    const res = await fetch('http://localhost:8080/api/client/status/active')

  if (!res.ok) {
    throw Error('Could not fetch the list of clients')
  }

  return res.json()

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
