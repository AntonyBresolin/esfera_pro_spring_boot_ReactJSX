import { putData } from "../hooks/fetchHooks";

export const desactiveUser = async (id, clients, url) => {
    const client = clients.find(client => client.id === id);
    client.status = 'desactive';
    url = url + id;
    await putData(url, client);
}

export const desactiveUsers = async (ids, clients, url) => {
    for (const id of ids) {
        await desactiveUser(id, clients, url);
    }
}