let token = document.cookie;
console.log("token", token)

async function postReq(route, body) {
    try {
        const response = await fetch(`http://localhost:8080/${route}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Authorization': token,
                "Content-type": "application/json; charset=UTF-8", },
        })
        const json = await response.json();
        const data = await json;
        return data;
    }
    catch (err) {
        console.log(err)
    }
}

async function getByReq(route, id) {
    try {
        const response = await fetch(`http://localhost:8080/${route}/${id}`, {
            method: 'GET',
            headers: { 'Authorization': token,
                "Content-type": "application/json; charset=UTF-8", },
        })
        const data = await response.json();
        console.log(data)
        return data;
    }
    catch (err) {
        console.log(err)
    }
}
async function getReq(route) {
    try {
        const response = await fetch(`http://localhost:8080/${route}`, {
            method: 'GET',
            headers: { 'Authorization': token,
                "Content-type": "application/json; charset=UTF-8", },
        })
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err)
    }
}
async function updateReq(route,body,id){
    try {
        fetch(`http://localhost:8080/${route}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Authorization': token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
    } catch (error) {
        console.log(err)
    }
}


async function deleteReq(route,id) {
    try {
        fetch(`http://localhost:8080/${route}/${id}`, {
            method: 'DELETE',
            headers:{'Authorization': token,}
        })
    }
    catch (err) {
        console.log(err)
    }
}

export { postReq, getReq, getByReq ,deleteReq,updateReq};
