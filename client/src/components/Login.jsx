import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { deleteReq, getByReq, postReq, getReq, updateReq } from "./fetch";
import { useForm } from "react-hook-form";
import CryptoJS from 'crypto-js';
import { UserContext } from './UserProvider'

const Login = () => {
    const navigate = useNavigate();
    const { user, setCurrentUser } = useContext(UserContext);
    const { register, handleSubmit, reset, } = useForm({ defaultValues: { email: '', password: '' } });
    const generatePasswordHash = (password) => {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        return hashedPassword;
    };

    useEffect(() => {
        if (user != null) {
            navigate(`/user/${user.Username}/restaurant`)
        }
        else {
            navigate("/login");
        }
    }, [])


    const onSubmit = async (userDetails) => {
        const hash_password = generatePasswordHash(userDetails.password);
        try {
            const post = await postReq("user/login", {Email: userDetails.email,Password: hash_password})
            console.log(post.status)
            if (post.status == 200) {
                console.log(post.data[0])
                const postData = post.data[0]
                const currentUser = {
                    userId: postData.UserID,
                    username: postData.Username,
                    email: postData.Email,
                    phoneNumber: postData.PhoneNumber,
                    address: postData.Address
                };
                setCurrentUser(currentUser);
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                reset();
                navigate(`/user/${post.Username}/restaurant`);
            }
            else {
                throw new Error(post.message)
            }
        }
        catch (err) {
            // if (err.message === "Not found")
                alert("Incorrect details");
            reset()
        }
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