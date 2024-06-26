import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
// import { UserContext } from '
import { UserContext } from './UserProvider'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Restaurant() {

    const { user } = useContext(UserContext);
    // const { userID } = useContext(UserContext);
    const name = JSON.parse(localStorage.getItem("currentUser")).Username;
    const navigate = useNavigate()
    // useEffect(
    //     () => {
    //         if (user == null) {
    //             navigate('/login')
    //         }
    //         getData()
    //     }, []
    // )
    // const [restaurants, setRestaurants] = useState([])
    // const getData = () => {
    //     console.log("1")
    //     fetch(`http://localhost:8080/restaurant`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setRestaurants(data)
    //             console.log(data);
    //             console.log(restaurants);

    //         }
    //         ).then(console.log("vvhjsdghjg",restaurants))

    // }
    useEffect(() => {
        if (user == null) {
            navigate('/login')
        }
        getData();
    }, []);
    
    const [restaurants, setRestaurants] = useState([]);
    // const [currentRestaurant, setCurrentRestaurant] = useState([]);
    
    useEffect(() => {
    }, [restaurants]);
    
    const getData = () => {
        fetch(`http://localhost:8080/restaurant`)
            .then(response => response.json())
            .then(data => {
                setRestaurants(data);
            })

            // .catch(error => console.error("Error fetching data:", error));
    };
// const getRestaurant=(id)=>{

//     fetch(`http://localhost:8080/restaurant/?RestauranID=${id}`)
//     .then(response => response.json())
//     .then(data => {
//         setCurrentRestaurant(data);
//     }).then(console.log(currentRestaurant));

// }

const  addRestaurant=()=>{
    fetch(`http://localhost:8080/restaurant`, {
        method: 'POST',
        body: JSON.stringify({
          Name: restaurants.name,
          Address: restaurants.address,
          PhoneNumber: restaurants.phoneNumber,
          ImageURL: restaurants.imageURL,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
}

        const columns = Object.keys(restaurants[0] || {}).map(key => ({
            field: key,
            header: key.charAt(0).toUpperCase() + key.slice(1)
        }));

    return (
        <>
            {/* <h1>{user.username}</h1> */}
            <h1>{name}</h1>
         
    
            {/* <DataTable value={restaurants} tableStyle={{ minWidth: '50rem' }}>
    <Column field="address" header="Address"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="phoneNamber" header="PhoneNamber"></Column>
    <Column field="imageUrl" header="ImageUrl"></Column>
</DataTable> */}
<DataTable value={restaurants} tableStyle={{ minWidth: '50rem' }}>
            {columns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} />
            ))}
        </DataTable>
       
        </>
    )
}

export default Restaurant

// {restaurants.map((restaurant) => {
//     return <div key={restaurants.id}>
//         <div>
//             <span>restaurant Id:{restaurant.id}</span>
//             <span>{restaurant.name}</span>
//             <span>{restaurant.address}</span>
//             <span>{restaurant.phonenumber}</span>
//             {/* <span>{restaurant.name}</span> */}

//         </div>

//     </div>
// })}



// function ObjectArrayComponent({ arrayOfObjects }) {
//     return (
  
//     );
// useEffect(() => {
//     if (user == null) {
//         navigate('/login')
//     }
//     getData();
// }, []);

// const [restaurants, setRestaurants] = useState([]);

// useEffect(() => {
//     console.log("Restaurants updated:", restaurants);
// }, [restaurants]);

// const getData = () => {
//     console.log("Fetching data...");
//     fetch(`http://localhost:8080/restaurant`)
//         .then(response => response.json())
//         .then(data => {
//             setRestaurants(data);
//             console.log("Fetched data:", data);
//         })
//         .catch(error => console.error("Error fetching data:", error));
// };

