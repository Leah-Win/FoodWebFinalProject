import { useContext } from 'react'
import {
    Link,
    useNavigate
} from "react-router-dom";
import { UserContext } from './UserProvider.jsx';
// import "../css/style.css";


function Home() {
    const { userID } = useContext(UserContext);
    const name = JSON.parse(localStorage.getItem("currentUser")).Username;
    const navigate = useNavigate()
    function logOut() {
        localStorage.removeItem("currentUser");
        // localStorage.removeItem("TOKEN");
        navigate("/login");
    }
    function ToResetaurant() {
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        navigate(`/user/${name}/restaurant`);

        // /user/${name}/restaurant
    }


    return (
        <>
            <h1>{name}</h1>
            {/* <Link to={{ pathname: `/restaurant` }}>Restaurant</Link> */}
            {/* <br /> */}
            {/* <Link to={{ pathname: `/user/${userID}/albums` }} >Albums</Link>
            <br /> */}
            {/* <Link to={{ pathname: `/user/${userID}/posts` }}>Posts</Link>
            <br />
            <Link to={{ pathname: `/user/${userID}/todos` }}>Todos</Link>
            <br /> */}
            <button onClick={ToResetaurant}>Restaurant</button>
            <button onClick={logOut}>Log Out</button>
        </>
    )
}

export default Home