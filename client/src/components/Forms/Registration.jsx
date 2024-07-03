import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { UserContext } from '../UserProvider'
import CryptoJS from 'crypto-js';

const Register = () => {

  const [isExsist, setIsExist] = useState(true);
  const { user, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const generatePasswordHash = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword;
  };

  const IntegrityChecks = {
    username: {
      required: " user name is required.",
      // pattern: {
      //   value: /^[a-zA-Z]*$/,
      //   message: "User name cannot contain a white space"
      // },
      minLength: {
        value: 2,
        message: "user name should be at-least 2 characters."
      }
    },
    Password: {
      required: "Password is required.",
      minLength: {
        value: 6,
        message: "Password should be at-least 6 characters."
      }
    },
    verifyPassword: {
      required: "verify-password is required.",
      minLength: {
        value: 6,
        message: "verify-password should be at-least 6 characters."
      }
    },
    email: {
      required: "Email is required"
    },
    phoneNumber: {
      required: "Phone number is required.",
      pattern: {
        value: /^[0-9-]+$/,
        message: 'Please enter only digits',
      }
      , minLength: {
        value: 9,
        message: 'phone number should be at-least 9 digits.'
      }
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (user != null) {
      navigate(`/register`)
    }
  }
    , [])

  const signUp = (userDetails) => {
    console.log("sign up")
    if (userDetails.password !== userDetails.verifyPassword) {
      alert('Error! password is not defined')
      reset();
      return;
    }
    fetch(`http://localhost:8080/user/Email/${userDetails.email}`)
      .then(data => data.json())
      .then(data => {
        if (data.status == 409) {
          alert('Incorrect details');
          reset();
          return;
        }
        reset();
        setIsExist(false);
        setCurrentUser(userDetails);
      })
  }

  const userData = (moreDetails) => {
    //console.log("2sign2 2up2")
    const hash_password = generatePasswordHash(user.password);
    fetch(`http://localhost:8080/user/signup`, {
      method: 'POST',
      body: JSON.stringify({
        Username: moreDetails.username,
        Email: user.email,
        PhoneNumber: moreDetails.phoneNumber,
        Address: moreDetails.address,
        password: hash_password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(response => {
        const currentUser = response.data;
        setCurrentUser(currentUser)
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
      }).then(()=>{console.log("user.userId",user.userId);

      });
      
    navigate(`/user/${user.username}/restaurant`);
  }

  // const insertPassword = () => {
  //   console.log("insert password1")
  //   console.log("user.userId",user)
  //   const hash_password = generatePasswordHash(user.password);
  //   fetch(`http://localhost:8080/forms`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       userId: user.userId,
  //       password: hash_password
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   }).then((response) => response.json())
  //     .then((data) => {
  //     console.log("insert password2"+data)
  //       if (data.status != 200)
  //         alert(data.message)
  //     })
  // }

  return (
    <>
      <h3>REGISTER</h3>
      {isExsist ? <form onSubmit={handleSubmit(signUp)} className="forms">
        <input type="email" placeholder="email"{...register("email", IntegrityChecks.email)} /><br />
        {errors.email && (
          <p className="errorMsg">{errors.email.message}</p>)}
        <input type="password" placeholder="password" {...register("password", IntegrityChecks.Password)} /><br />
        {errors.password && (
          <p className="errorMsg">{errors.password.message}</p>)}
        <input type="password" placeholder="verify-password" {...register("verifyPassword", IntegrityChecks.verifyPassword)} />
        {errors.verifyPassword && (
          <p className="errorMsg">{errors.verifyPassword.message}</p>)}<br />
        <button type="submit" className="BTNforns">Submit</button><br />
        <Link to="/login">already registered?</Link>
      </form>
        :
        <form onSubmit={handleSubmit(userData)} className="forms">
          <input type="text" placeholder="user name" {...register("username", IntegrityChecks.username)} /><br />
          {errors.username && (
            <p className="errorMsg">{errors.username.message}</p>)}
          <input type="text" placeholder="phone number" {...register("phoneNumber", IntegrityChecks.phoneNumber)} /><br />
          {errors.phoneNumber && (
            <p className="errorMsg">{errors.phoneNumber.message}</p>)}
          <input type="text" placeholder="Address" {...register("address", IntegrityChecks.address)} /><br />
          {errors.adderss && (
            <p className="errorMsg">{errors.address.message}</p>)}<br />
          <button type="submit" className="BTNforns">Register</button>
        </form>}
    </>
  )
}
export default Register




// import React from 'react'
// import CryptoJS from 'crypto-js';
// import { useState } from 'react';
// import {useNavigate} from "react-router-dom";
// // import "../css/style.css";

// function Register() {
//     const [email, setEmail] = useState(null);
//     const [password, setPassword] = useState(null);
//     const [verifyPassword, setVerifyPassword] = useState(null);
//     const navigate=useNavigate()

//     const generatePasswordHash = (password) => {
//       const hashedPassword = CryptoJS.SHA256(password).toString();
//       return hashedPassword;
//     };
//     const hash_password = generatePasswordHash(password);

//     function register() {
//       debugger
//       console.log("register")
//       if (password === verifyPassword) {
//         // fetch(`http://localhost:8080/register`, {
//         fetch(`http://localhost:8080/forms/signup}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({"email": email, "password_hash": hash_password})
//         })
//         .then(response =>{
//           if(!response.ok){
//             throw new Error('An error occurred, try again!')
//           }
//           return response.json()
//         })
//         .then(data => {
//           localStorage.setItem("TOKEN", data.accessToken);
//         })
//         .then(() => navigate("/register/details", { state: { email: email } }))
//         .catch(error => {
//           alert(error.message);
//         });
//       } else {
//           alert("Passwords do not match");
//           reset();
//       }
//   }

//   return (
//     <>
//       <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}required/>
//       <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}required/>
//       <input type='password' placeholder='Verify Password' onChange={(e) => setVerifyPassword(e.target.value)} required/>
//       <button type='submit' onClick={register}>Register</button>

//     </>
//   )
// }

// export default Register