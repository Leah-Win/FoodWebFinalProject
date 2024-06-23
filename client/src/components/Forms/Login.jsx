import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import CryptoJS from 'crypto-js';
import { UserContext } from '../UserProvider'
// import './Forms.css'
const Login = () => {

    const navigate = useNavigate();
    const { user, setCurrentUser } = useContext(UserContext);
    const generatePasswordHash = (password) => {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        return hashedPassword;
      };


    useEffect(() => {
        console.log(user)
        if (user != null) {
            console.log(user.Username)
            navigate(`/home/user/${user.Username}`)
        }
        else{
            navigate("/login");
        }
    }, [])

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });
 
    const onSubmit = (userDetails) => {
      debugger
      const hash_password = generatePasswordHash(userDetails.password);
      console.log(hash_password);
        fetch(`http://localhost:8080/forms/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: userDetails.username,
                password: hash_password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.status == 200) {
                    reset();
                    const currentUser = {
                        id: response.data[0].UserID, username: response.data[0].Username,
                        email: response.data[0].Email, phone: response.data[0].PhoneNumber,address:response.data[0].Address
                    };
                    setCurrentUser(currentUser);
                    console.log("currentUser", currentUser)
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    console.log("currentUser", localStorage.getItem('currentUser'))
                    navigate(`/home/user/${response.data[0].username}`);
                }
                else{
                    throw new Error(response.message)
                }
            })
            // .then(data => {
            //     localStorage.setItem("TOKEN", data.accessToken);
            // })
           .catch((err)=>{
                if(err.message==="Not found")
                    alert("A user with this data is not found");
            })
    }

    return (<>
        <h3>LOG IN</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="forms">
            <input type="text" placeholder="user name" {...register("username", { required: true })} /><br />
            <input type="password" placeholder="password" {...register("password", { required: true })} /><br />
            <button className="BTNforns">Log in</button><br />
            <Link to="/register">not registered yet?</Link>
        </form></>
    )

}
export default Login



// import React from 'react'
// import CryptoJS from 'crypto-js';
// import { useState, useEffect, useContext } from 'react'
// import {
//   useNavigate, Link
// } from "react-router-dom";
// import "../App";
// import { UserContext } from '../UserProvider';

//  function Login() {
//     const [email, setEmail] = useState(null);
//     const [password, setPassword] = useState(null);
//     const navigate=useNavigate()
//     const { updateUserID } = useContext(UserContext);

//     const generatePasswordHash = (password) => {
//       const hashedPassword = CryptoJS.SHA256(password).toString();
//       return hashedPassword;
//     };
//     const hash_password = generatePasswordHash(password);

//     function login(){
//       console.log("hiiiiiiiiiiiiiiiii")
//       fetch(`http://localhost:8080/login`, {
//         method: 'POST',
//         body: JSON.stringify(
//           {"email": email, "password_hash": hash_password}
//             // username: userDetails.username,
//             // password: userDetails.password
//         ),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//         .then(response => response.json())
//         .then(response => {
//             if (response.status == 200) {
//                 reset();
//                 console.log("loooooooooooooooo")

//                 const currentUser = {
//                     id: response.data[0].id, name: response.data[0].name, username: response.data[0].username,
//                     email: response.data[0].email, phone: response.data[0].phone
//                 };
//                 // setCurrentUser(currentUser);
//                 // localStorage.setItem("currentUser", JSON.stringify(currentUser));
//                 navigate(`/home/user/${response.data[0].username}`);
//             }
//             else{
//                 throw new Error(response.message)
//             }
//         }).catch((err)=>{
//             if(err.message==="Not found")
//                 alert("A user with this data is not found");
//         })
//       //A
      
//       // fetch(`http://localhost:8080/login`, {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json'
//       //   },
//       //   body: JSON.stringify({"email": email, "password_hash": hash_password})
//       // })
//       // .then(response => {
//       //   if(!response.ok)
//       //     throw new Error('error, please try egain whith anouther email or password or sing up')
//       //   return response.json();
//       // })
//       // .then(data => {
//       //   localStorage.setItem("TOKEN", data.accessToken);
//       // })
//       // .then(() => getUser())
//       // .catch(error => {
//       //     alert(error.message);
//       //   });
//     }


//     function getUser(){
//       const token = localStorage.getItem('TOKEN');
//       fetch(`http://localhost:8080/users?email=${email}`,{
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         if(!response.ok)
//           throw new Error('ERROR: ' + response.status + ' ' + response.message)
//         return response.json();
//       })
//       .then(data => {
//         const currentUser = data[0];
//         localStorage.setItem("currentUser", JSON.stringify(currentUser));
//         updateUserID();
//         navigate(`/user/${currentUser.id}/home`);
//       }).catch(error => {
//           alert(error.message);
//         });
//     }


//   return (
//     <>
//       <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
//       <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
//       <button onClick={login}>Login</button>
//       <Link to="/register">New User?</Link>
//     </>
//   )
// }

// export default Login