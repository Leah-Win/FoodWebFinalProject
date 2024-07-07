import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { UserContext } from './UserProvider'
import { deleteReq, getByReq, postReq, getReq, updateReq } from "./fetch";
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

  const signUp = async (userDetails) => {
    console.log("sign up")
    if (userDetails.password !== userDetails.verifyPassword) {
      alert('Error! password is not defined')
      reset();
      return;
    }
    const isExist = await getByReq("user/Email", userDetails.email)
    if (isExist.status != 200) {
      alert('Incorrect details');
      reset();
      return;
    }
    reset();
    setIsExist(false);
    setCurrentUser(userDetails);
  }
  const userData = async (moreDetails) => {
    const hash_password = generatePasswordHash(user.password);
    const body={
      Username: moreDetails.username,
      Email: user.email,
      PhoneNumber: moreDetails.phoneNumber,
      Address: moreDetails.address,
      password: hash_password
    }
    const getUser = await postReq("user/signup", body)
    const currentUser = getUser.data;
    setCurrentUser(currentUser)
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    navigate(`/user/${user.username}/restaurant`);
  }

 
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