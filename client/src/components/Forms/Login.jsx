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
        if (user != null) {
            console.log(user.username)
            navigate(`/user/${user.Username}/restaurant`)
        }
        else {
            navigate("/login");
        }
    }, [])

    const { register, handleSubmit, reset, } = useForm({ defaultValues: { email: '', password: '' } });

    const onSubmit = (userDetails) => {
        const hash_password = generatePasswordHash(userDetails.password);
        console.log(hash_password);
        fetch(`http://localhost:8080/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                Email: userDetails.email,
                Password: hash_password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data[0])
                    const currentUser = {
                        userId: response.data[0].UserID,
                        username: response.data[0].Username,
                        email: response.data[0].Email,
                        phoneNumber: response.data[0].PhoneNumber,
                        address: response.data[0].Address
                    };
                    setCurrentUser(currentUser);
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                   reset();
                    navigate(`/user/${response.data[0].Username}/restaurant`);
                }
                else {
                    throw new Error(response.message)
                }
            })
            // .then(data => {
            //     localStorage.setItem("TOKEN", data.accessToken);
            // })
            .catch((err) => {
                if (err.message === "Not found")
                    alert("Incorrect details");
            })
    }

    return (<>
        <h3>LOG IN</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="forms">
            <input type="email" placeholder="email" {...register("email", { required: true })} /><br />
            <input type="password" placeholder="password" {...register("password", { required: true })} /><br />
            <button className="BTNforns">Log in</button><br />
            <Link to="/register">Not registered yet? Sign up</Link>
        </form></>
    )
}
export default Login