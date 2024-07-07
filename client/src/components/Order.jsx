import React, { useRef, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { deleteReq, postReq, getReq, updateReq } from "./fetch";
import { UserContext } from './UserProvider'
import { useLocation, useParams } from 'react-router-dom'
import FormLabel from '@mui/joy/FormLabel';

export default function Order(){
const { register, handleSubmit, reset, formState: { errors } } = useForm();
const location = useLocation();
const copyMenu = location.state;
const [orderSend, setOrderSend] = useState([]);
const [countTotalAmount, setCountTotalAmount] = useState(0);
const [items, setItems]= useState([])
const navigate = useNavigate();

const updateOrderSend = (menu) => {
  
  setItems(menu.map(item => ({ itemId: item.RestaurantMenuID, quantity: item.Quantity, price:item.Price })));
  console.log(items," items")


  setOrderSend(menu);
  console.log(copyMenu[0].Quantity+" copymenu "+menu+" menu "+orderSend+" ordersend ")
  let totalAmount = 0;
  for (let i = 0; i < menu.length; i++) {
    totalAmount += menu[i].Price * menu[i].Quantity;
  }
  setCountTotalAmount(totalAmount);
  console.log(countTotalAmount," totalAmount")

}

useEffect(() => {
  updateOrderSend(copyMenu);
}, []);

  const { user } = useContext(UserContext);
        const addOrder = async (data) => {
          // alert("kijgcxfcj")
          console.log(orderSend+"  "+user.username+"orderSend.Quantity"+copyMenu)
          let post = await postReq("order",{
           UserID: user.userid, 
           TotalAmount: countTotalAmount,
           items: items
           });
           console.log(post)
            window.open(`https://www.paypal.com/ncp/payment/7VZJM8ZXNGAQ6`)
           
          }

    return (        
       <>
       <h1 >Hello {user.userObject.username} </h1>

       <h1 >yours total payment:</h1>
       <h2>{countTotalAmount}₪</h2>
       <form onSubmit={handleSubmit(addOrder)} className="forms">
       <FormLabel>name</FormLabel>
        <input type="text" placeholder="name"  required defaultValue={user.username} {...register("name")} /><br/>
       <FormLabel>address</FormLabel>
        
        {/* <input type="text" placeholder="price" defaultValue={copyMenu[0].Quantity} {...register("price")} /> */}
        <input type="text" placeholder="address" required defaultValue={user.address} {...register("address")} /><br/>
        {console.log(countTotalAmount, "totalAmount")}

        {/* <input type="text" placeholder="total amount" defaultValue={countTotalAmount} {...register("totalAmount")} /><br/> */}
        {/* {/* <input type="text" placeholder="imageURL" defaultValue={menuDetails.ImageURL} {...register("imageURL")} /> */}
       <FormLabel>phone number</FormLabel>

        <input type="text" placeholder="phone number"required  defaultValue={user.phoneNumber} {...register("details")} /><br/>
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

