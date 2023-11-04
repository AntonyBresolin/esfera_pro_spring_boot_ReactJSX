export const clientsLoader = async () => {
    const res = await fetch('http://localhost:8080/clients')

  if (!res.ok) {
    throw Error('Could not fetch the list of clients')
  }

  return res.json()

}