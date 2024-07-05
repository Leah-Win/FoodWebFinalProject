import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

// import { UserContext } from '
import { UserContext } from './UserProvider'
import { useLocation, useParams } from 'react-router-dom'

// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

// import { styled } from '@mui/material/styles';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Stack from '@mui/material/Stack';

// import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
// export default function Order() {



// import NavBar from './NavBar.js';
// import MyAlert from './MyAlert.js';

export default function Order(){

  const [orderSend, setOrderSend] = useState([]);
  const [countTotalAmount, setCountTotalAmount] = useState({a:"fff",count1:0});

  const location = useLocation();

    const  copyMenu  = location.state;
   const getData=()=>{

    //const orderSend=JSON.stringify(copyMenu)
   // console.log(copyMenu[0].Quantity,"copyMenu",copyMenu)
    setOrderSend(copyMenu)
   }

   //const finalAmount = () =>{   
    //console.log(countTotalAmount,"countTotalAmount",copyMenu.length)

  useEffect(() => {
    //finalAmount()
    let count=0
         for (let i = 0; i < copyMenu.length; i++) {
          count=count+(copyMenu[i].Price*copyMenu[i].Quantity)
         setCountTotalAmount({...countTotalAmount,count1: countTotalAmount.count1+count})

           console.log(count,countTotalAmount,"count")
         }
         //setCountTotalAmount({count1: countTotalAmount.count1+count})
         console.log(count,countTotalAmount,"countTotalAmount")
         
       
    getData()
  //console.log(orderSend,"orderSend")
},[])
  
  const { restaurantID } = useParams();
  const { register,  reset, formState: { errors } } = useForm();

  //console.log(restaurantID);
  const { user } = useContext(UserContext);
  //const name = JSON.parse(localStorage.getItem("currentUser")).Username;

      const [firstname, setFirstname] = useState('');
      const [lastname, setLastname] = useState('');
      //const [investment, setInvestment] = useState(0);
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState(0);
      const [details, setDetails] = useState('');    
    
      const addInvestment = () =>{   
        alert("parpar")
          

        // const data = this.state;
      //   fetch('http://localhost:8080/enterprise', {
          
      //       method: 'POST', body: JSON.stringify(data)
      //       , mode: 'cors', headers: {
      //           'Content-Type': 'application/json'
      //       },
      //   }).then((response) => {
      //       debugger
      //       return response.json()
      //   })
      //       .then((data) => console.log(data))
      //       .catch(data => console.log(data));      
      // }
}
      const handleSubmit = event => {
        alert("parparoooosssss")
        addInvestment();
        // event.preventDefault();         
        // console.log('firstname ', firstname);
        // console.log('lastname ', lastname);
        // return(<MyAlert/>);
      };

    return (        
       <>
       <form onSubmit={handleSubmit} className="forms">
        <input type="text" placeholder="name" defaultValue={user.username} {...register("name")} />
        {console.log(copyMenu[0].Quantity,"copyMenu")}
        {/* <input type="text" placeholder="price" defaultValue={copyMenu[0].Quantity} {...register("price")} /> */}
        <input type="text" placeholder="address" defaultValue={user.address} {...register("address")} />
        <input type="text" placeholder="total amount" defaultValue={countTotalAmount.count1} {...register("totalAmount")} />
      

        {/* <input type="text" placeholder="imageURL" defaultValue={menuDetails.ImageURL} {...register("imageURL")} />
        <input type="text" placeholder="details" defaultValue={menuDetails.Details} {...register("details")} />  */}
        <button type="submit" className="BTNforns">for payment ⇒</button>
      </form>
    </> 
    )
  }






  // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

  // export default function Order() {
  // const { user } = useContext(UserContext);


  
  //     const initialOptions = {
  //         clientId: user.userID,
  //     };
  
  //     const createOrder = async () => {
  //         try {
  //             const response = await fetch("http://localhost:8080/create-paypal-order", {
  //                 method: "POST",
  //                 headers: { "Content-Type": "application/json" },
  //                 body: JSON.stringify({
  //                     cart: [{ id: "YOUR_PRODUCT_ID", quantity: "YOUR_PRODUCT_QUANTITY" }],
  //                 }),
  //             });
  
  //             const orderData = await response.json();
  
  //             if (!orderData.id) {
  //                 const errorDetail = orderData.details[0];
  //                 const errorMessage = errorDetail
  //                     ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
  //                     : "Unexpected error occurred, please try again.";
  
  //                 throw new Error(errorMessage);
  //             }
  
  //             return orderData.id;
  
  //         } catch (error) {
  //             console.error(error);
  //             throw error;
  //         }
  //     }
  
  //     return (
  //         <div className="App">
  //             <PayPalScriptProvider options={initialOptions}>
  //                 <PayPalButtons
  //                     createOrder={createOrder}
  //                 />
  //             </PayPalScriptProvider>
  //         </div>
  //     );
  // }
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   }
//   return ()

// }
//   // const { userID } = useContext(UserContext);
//   const name = JSON.parse(localStorage.getItem("currentUser")).Username;
//   const navigate = useNavigate()
//   // useEffect(
//   //     () => {
//   //         if (user == null) {
//   //             navigate('/login')
//   //         }
//   //         getData()
//   //     }, []
//   // )
//   // const [orders, setOrders] = useState([])
//   // const getData = () => {
//   //     console.log("1")
//   //     fetch(`http://localhost:8080/order`)
//   //         .then(response => response.json())
//   //         .then(data => {
//   //             setOrders(data)
//   //             console.log(data);
//   //             console.log(orders);

//   //         }
//   //         ).then(console.log("vvhjsdghjg",orders))

//   // }
//   useEffect(() => {
//     if (user == null) {
//       navigate('/login')
//     }
//     getData();
//   }, []);

//   const [orders, setOrders] = useState([]);
//   // const [currentOrder, setCurrentOrder] = useState([]);

//   useEffect(() => {
//   }, [orders]);

//   const getData = () => {
//     fetch(`http://localhost:8080/order`)
//       .then(response => response.json())
//       .then(data => {
//         setOrders(data);
//       })

//     // .catch(error => console.error("Error fetching data:", error));
//   };
//   // const getOrder=(id)=>{

//   //     fetch(`http://localhost:8080/order/?RestauranID=${id}`)
//   //     .then(response => response.json())
//   //     .then(data => {
//   //         setCurrentOrder(data);
//   //     }).then(console.log(currentOrder));

//   // }

//   // const addOrder = () => {
//   //   fetch(`http://localhost:8080/order`, {
//   //     method: 'POST',
//   //     body: JSON.stringify({
//   //       Name: orders.name,
//   //       Address: orders.address,
//   //       PhoneNumber: orders.phoneNumber,
//   //       ImageURL: orders.imageURL,
//   //     }),
//   //     headers: {
//   //       'Content-type': 'application/json; charset=UTF-8',
//   //     },
//   //   })
//   // }

//   return (
//     <>
//       <h1>{name}</h1>
//       <Grid
//         container
//         spacing={{ xs: 3, md: 3 }}
//         columns={{ xs: 4, sm: 8, md: 10 }}
//         sx={{ justifyContent: "flex-end" }}
//       >
//         {orders.map((order) => (
//           <Grid xs={2} sm={4} md={4} key={order.OrderID}>
//             <Card variant="outlined" sx={{ width: 320 }} key={order.OrderID}>
//               <CardOverflow>
//                 <AspectRatio ratio="2">
//                   {/* <Link
//                     overlay
//                     href={`/user/${name}/${order.OrderID}/orderMenu`}
//                     state={{ infoResID: order.OrderID }}
//                     underline="none"
//                     sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}> */}
//                     {/* <img
//                       src={Order.ImageURL}
//                       loading="lazy"
//                       alt=""
//                     /> */}
//                   {/* </Link> */}
//                 </AspectRatio>
//               </CardOverflow>
//               <CardContent>
//                 <Typography level="title-md">{Order.TotalAmount}</Typography>
//                 <Typography level="body-sm">{Order.OrderData}</Typography>
//               </CardContent>
//               <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
//               </CardOverflow>
//             </Card>
//           </Grid>))}
//       </Grid>
//     </>
//   )
// }

