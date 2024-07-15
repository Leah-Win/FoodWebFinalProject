const URL = "http://localhost:8080"


async function postReq(route, body) {
    try {
        const response = await fetch(`${URL}/${route}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Origin': URL,
                "Content-type": "application/json; charset=UTF-8",
            },
            credentials: 'include'
        })
        const json = await response.json();
        const data = await json;
        return data;
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

async function getByReq(route, id) {
    try {
        const response = await fetch(`${URL}/${route}/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Origin': URL,
            },credentials: 'include'
        })
        const data = await response.json();
        return data;
    }
    catch (err) {

        console.log(err)
        throw err;

    }
}
async function getReq(route) {
    try {
        const response = await fetch(`${URL}/${route}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Origin': URL,
            },
            credentials: 'include'
        })
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err)
        throw err;

    }
}
async function updateReq(route, body, id) {
    try {
        fetch(`${URL}/${route}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Origin': URL,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
    } catch (error) {
        console.log(err)
        throw err;

    }
}


async function deleteReq(route, id) {
    try {
        fetch(`${URL}/${route}/${id}`, {
            method: 'DELETE',
            headers: {
                'Origin': URL,
                'Content-type': 'application/json; charset=UTF-8'
            }, credentials: 'include'
        })
    }
    catch (err) {
        console.log(err)
        throw err;

    }
}

export { postReq, getReq, getByReq, deleteReq, updateReq };
