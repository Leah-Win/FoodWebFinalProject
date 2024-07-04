
async function postReq(route, body) {
    console.log("fetchPostReq");
    console.log(body)
    try {
        const response = await fetch(`http://localhost:8080/${route}`, {
            method: 'POST',
            body: JSON.stringify(body),
            //      body: JSON.stringify({ "username": userName, "categoriesArray": categoriesArray })
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
       // console.log("hgjghjjjjjjjjjjj ", body)
        const json = await response.json();
        const data = await json;
        //  console.log(data.data)
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
            // body: JSON.stringify(body),
            //      body: JSON.stringify({ "username": userName, "categoriesArray": categoriesArray })
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
        const data = await response.json();
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
            headers: { "Content-type": "application/json; charset=UTF-8", },
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
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
    } catch (error) {
        console.log(err)
    }
}


async function deleteReq(route,id) {
    // console.log(restaurantID)
    try {
        fetch(`http://localhost:8080/${route}/${id}`, {
            method: 'DELETE',
        })
    }
    catch (err) {
        console.log(err)
    }
}

export { postReq, getReq, getByReq ,deleteReq,updateReq};
