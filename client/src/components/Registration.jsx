import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { UserContext } from './UserProvider'
import { getByReq, postReq } from "./fetch";

const Register = () => {

  const [isExist, setIsExist] = useState(true);
  const { user, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const IntegrityChecks = {
    username: {
      required: "Username is required.",
      minLength: {
        value: 2,
        message: "Username should be at least 2 characters."
      }
    },
    password: {
      required: "Password is required.",
      minLength: {
        value: 6,
        message: "Password should be at least 6 characters."
      }
    },
    verifyPassword: {
      required: "Verify Password is required.",
      minLength: {
        value: 6,
        message: "Verify Password should be at least 6 characters."
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
      },
      minLength: {
        value: 9,
        message: 'Phone number should be at least 9 digits.'
      }
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user != null) {
      navigate(`/register`);
    }
  }, []);

  // const signUp = async (userDetails) => {
  //   if (userDetails.password !== userDetails.verifyPassword) {
  //     alert('Error! Passwords do not match.');
  //     reset();
  //     return;
  //   }
  //   try {
  //     const isExist = await getByReq(`user/Email/${userDetails.email}`);
  //     reset();
  //     // setIsExist(false);
  //     setCurrentUser(userDetails);
  //   } catch (err) {
  //     alert('Incorrect details');
  //     reset();
  //   }
  // };

  const signUp = async (userDetails) => {
    if (userDetails.password !== userDetails.verifyPassword) {
      alert('Error! Passwords do not match.');
      reset();
      return;
    }
    const body = {
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password
    };
    try {
      const currentUser = await postReq("user/signup", body);
      // const currentUser = getUser;
      console.log(currentUser[0],"currentUser");
      setCurrentUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate(`/user/${userDetails.username}/restaurant`);
    } catch (err) {
      alert("Not successful, please try again.")
    }
  };

  return (
    <>
      <h3>REGISTER</h3>
        <form onSubmit={handleSubmit(signUp)} className="forms">
          <input type="email" placeholder="Email" {...register("email", IntegrityChecks.email)} /><br />
          {errors.email && (
            <p className="errorMsg">{errors.email.message}</p>)}
            <input type="text" placeholder="Username" {...register("username", IntegrityChecks.username)} /><br />
          {errors.username && (
            <p className="errorMsg">{errors.username.message}</p>)}
          <input type="password" placeholder="Password" {...register("password", IntegrityChecks.password)} /><br />
          {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>)}
          <input type="password" placeholder="Verify Password" {...register("verifyPassword", IntegrityChecks.verifyPassword)} /><br />
          {errors.verifyPassword && (
            <p className="errorMsg">{errors.verifyPassword.message}</p>)}<br />
          <button type="submit" className="BTNforns">Submit</button><br />
          <Link to="/login">Already registered?</Link>
        </form>
      
    </>
  );
};

export default Register;

// : (
//   <form onSubmit={handleSubmit(userData)} className="forms">
//     <input type="text" placeholder="Username" {...register("username", IntegrityChecks.username)} /><br />
//     {errors.username && (
//       <p className="errorMsg">{errors.username.message}</p>)}
//     <input type="text" placeholder="Phone Number" {...register("phoneNumber", IntegrityChecks.phoneNumber)} /><br />
//     {errors.phoneNumber && (
//       <p className="errorMsg">{errors.phoneNumber.message}</p>)}
//     <input type="text" placeholder="Address" {...register("address", IntegrityChecks.address)} /><br />
//     {errors.address && (
//       <p className="errorMsg">{errors.address.message}</p>)}<br />
//     <button type="submit" className="BTNforns">Register</button>
//   </form>
// )}