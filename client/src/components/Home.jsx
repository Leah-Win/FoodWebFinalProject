import { useContext } from 'react'
import {
    Link,
    useNavigate
} from "react-router-dom";
import { UserContext } from './UserProvider.jsx';
import './css/home.css'
function Home() {

    const { user } = useContext(UserContext);
    // useEffect(() => {
    //     console.log(user)
    //     if (user != null) {
    //         console.log(user.Username)
    //         navigate(`/home/user/${user.Username}`)
    //     }
    //     else{
    //         navigate("/login");
    //     }
    // }, [])
    const name = JSON.parse(localStorage.getItem("currentUser")).Username;
    const navigate = useNavigate()
    function logOut() {
        localStorage.removeItem("currentUser");
        // localStorage.removeItem("TOKEN");
        navigate("/login");
    }
    
    function ToResetaurant() {
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