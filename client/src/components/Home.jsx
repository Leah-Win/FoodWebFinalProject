// import { useContext } from 'react'
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from './UserProvider.jsx';
// import './css/home.css'

// function Home() {
//     const navigate = useNavigate()
//     const { user } = useContext(UserContext);

//     useEffect(() => {
//         if (user != null) {
//             const name = JSON.parse(localStorage.getItem("currentUser")).Username;
//             console.log(user.Username)
//             navigate(`/home/user/${user.Username}`)
//         }
//     }, [])

//     function logOut() {
//         localStorage.removeItem("currentUser");
//         // localStorage.removeItem("TOKEN");
//         navigate("/login");
//     }

//     function ToResetaurant() {
//         navigate(`/user/${name}/restaurant`);
//         // /user/${name}/restaurant
//     }

//     return (
//         <>
//             <h1>{name}</h1>
//             {/* <Link to={{ pathname: `/restaurant` }}>Restaurant</Link> */}
//             {/* <br /> */}
//             <button onClick={ToResetaurant}>Restaurant</button>
//             <button onClick={logOut}>Log Out</button>
//         </>
//     )
// }

// export default Home