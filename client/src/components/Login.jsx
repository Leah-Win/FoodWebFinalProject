import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { postReq } from "./fetch";
import { useForm } from "react-hook-form";
import { UserContext } from './UserProvider'
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();

    const { user, setCurrentUser } = useContext(UserContext);

    const { register, handleSubmit, reset, } = useForm({ defaultValues: { email: '', password: '' } });

    useEffect(() => {
        if (user != null) {
            navigate(`/user/${user.username}/restaurant`)
        } else {
            navigate("/login");
        }
    }, [])


    const onSubmit = async (userDetails) => {
        try {
            const post = await postReq("user/login", { email: userDetails.email, password: userDetails.password })
            const userA = post.data;
            Cookies.set("currentUser", JSON.stringify(userA));
            setCurrentUser(userA);

            reset();
            navigate(`/user/${userA.username}/restaurant`);
        } catch (err) {
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