export const getData = async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw Error('Could not fetch the list of clients')
    }

    return res.json()

}

export const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw Error('Could not fetch the list of clients')
    }

    return res.json()

}

export const putData = async (url, data) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw Error('Could not fetch the list of clients')
    }

    return res.json()

}

export const deleteData = async (url) => {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
    })

    if (!res.ok) {
        throw Error('Could not fetch the list of clients')
    }

    return res.json()

}