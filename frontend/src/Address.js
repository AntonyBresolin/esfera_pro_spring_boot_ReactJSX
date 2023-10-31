const BASE_URL = 'http://localhost:8080';

async function getAddress() {
    const response = await fetch(`${BASE_URL}/api/address`);
    const address = await response.json();
    return address;
}

async function updateAddress(address) {
    const response = await fetch(`${BASE_URL}/api/address`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
    });
    const updatedAddress = await response.json();
    return updatedAddress;
}

async function deleteAddress() {
    const response = await fetch(`${BASE_URL}/api/address`, {
        method: 'DELETE',
    });
    const deletedAddress = await response.json();
    return deletedAddress;
}

async function createAddress(address) {
    const response = await fetch(`${BASE_URL}/api/address`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
    });
    const createdAddress = await response.json();
    return createdAddress;
}

async function getAllAddress() {
    const response = await fetch(`${BASE_URL}/api/addresses`);
    const addresses = await response.json();
    return addresses;
}

async function getOneAddress(id) {
    const response = await fetch(`${BASE_URL}/api/address/${id}`);
    const address = await response.json();

   return loadAdress(address)

}

function loadAdress(address){
    const addressElement = document.getElementById('conteudo');
    console.log(address.street)
}