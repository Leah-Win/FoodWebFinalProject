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
  setOrderSend(menu);
  let totalAmount = 0;
  for (let i = 0; i < menu.length; i++) {
    totalAmount += menu[i].Price * menu[i].Quantity;
  }
  setCountTotalAmount(totalAmount);
}

useEffect(() => {
  updateOrderSend(copyMenu);
}, []);

  const { user } = useContext(UserContext);
        const addOrder = async (data) => {
          alert("You are transferred to payment")
            window.open(`https://www.paypal.com/ncp/payment/7VZJM8ZXNGAQ6`)
          }

    return (        
       <>
       <h1 >Hello {user.username} </h1>
       <h1 >yours total payment:</h1>
       <h2>{countTotalAmount} ₪</h2>
       <form onSubmit={handleSubmit(addOrder)} className="forms">
       <FormLabel>name</FormLabel>
        <input type="text" placeholder="name"  required defaultValue={user.username} {...register("name")} /><br/>
       <FormLabel>address</FormLabel>
        <input type="text" placeholder="address" required defaultValue={user.address} {...register("address")} /><br/>
       <FormLabel>phone number</FormLabel>
        <input type="text" placeholder="phone number"required  defaultValue={user.phoneNumber} {...register("details")} /><br/>
        <button type="submit" className="BTNforns">for payment ⇒</button>
      </form>
    </> 
    )
  }
