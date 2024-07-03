import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";


import './css/resturants.css'

// import { UserContext } from '
import { UserContext } from './UserProvider'
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
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function Restaurant() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }



  const { user } = useContext(UserContext);
  // const { userID } = useContext(UserContext);
  // const name = JSON.parse(localStorage.getItem("currentUser")).username;
  const navigate = useNavigate()
  // useEffect(
  //     () => {
  //         if (user == null) {
  //             navigate('/login')
  //         }
  //         getData()
  //     }, []
  // )
  // const [restaurants, setRestaurants] = useState([])
  // const getData = () => {
  //     console.log("1")
  //     fetch(`http://localhost:8080/restaurant`)
  //         .then(response => response.json())
  //         .then(data => {
  //             setRestaurants(data)
  //             console.log(data);
  //             console.log(restaurants);

  //         }
  //         ).then(console.log("vvhjsdghjg",restaurants))

  // }
  useEffect(() => {
    console.log(user)
    if (user == null) {
      navigate('/login')
    }
    getData();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [restaurants, setRestaurants] = useState([]);
  const [updateRestaurant, setUpdateRestaurant] = useState(false);

  const [isManager, setIsManager] = useState(true);
  const [newRestaurant, setNewRestaurant] = useState(false);



  // const [currentRestaurant, setCurrentRestaurant] = useState([]);

  useEffect(() => {
  }, [restaurants]);

  const getData = () => {
    fetch(`http://localhost:8080/restaurant`)
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
      })

    // .catch(error => console.error("Error fetching data:", error));
  };
  // const getRestaurant=(id)=>{

  //     fetch(`http://localhost:8080/restaurant/?RestauranID=${id}`)
  //     .then(response => response.json())
  //     .then(data => {
  //         setCurrentRestaurant(data);
  //     }).then(console.log(currentRestaurant));

  // }

  const AddRestaurant = () => {
    setNewRestaurant(true)
  }

  // const DeleteRestaurant =()=>{
  //   setDeleteRestaurant(true)
  // }

  // const AddRestaurant =()=>{
  //   setNewRestaurant(true)
  // }
  const deleteTheRestaurant = (restaurantDetails) => {
    fetch(`http://localhost:8080/restaurant/${restaurantDetails}`, {
      method: 'DELETE',
    })
  }
  //.then(()=>{
  //     // reset()
  //     setDeleteRestaurant(false)}
  // );

  const UpdateRestaurnt = (restaurantDetails) => {

    fetch(`http://localhost:8080/restaurant/${restaurantDetails.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        Name: restaurantDetails.name,
        Address: restaurantDetails.address,
        PhoneNumber: restaurantDetails.phoneNumber,
        ImageURL: restaurantDetails.imageURL,
        Description: restaurantDetails.description
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(response => response.json())
    setUpdateRestaurant(false)
  }

  const addRestaurant = (restaurantDetails) => {
    fetch(`http://localhost:8080/restaurant`, {
      method: 'POST',
      body: JSON.stringify({
        Name: restaurantDetails.name,
        Address: restaurantDetails.address,
        PhoneNumber: restaurantDetails.phoneNumber,
        ImageURL: restaurantDetails.imageURL,
        Description: restaurantDetails.description

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then(() => {
        reset()
        setNewRestaurant(false)
      }
      )
  }


  return (
    <>
      <h1>{user.username}</h1>
      {isManager ? <Button onClick={AddRestaurant} variant="outlined" color="neutral" >New Restaurnt</Button> : <></>}

      {
        newRestaurant && <form onSubmit={handleSubmit(addRestaurant)} className="forms">

          <input type="text" placeholder="name" {...register("name")} /><br />
          {/* {errors.name && (
            <p className="errorMsg">{errors.name.message}</p>)} */}
          <input type="number" placeholder="phone number" {...register("phoneNumber")} /><br />
          {/* {errors.phoneNumber && (
            <p className="errorMsg">{errors.phoneNumber.message}</p>)} */}
          <input type="text" placeholder="Address" {...register("address")} /><br />
          {/* {errors.adderss && (
            <p className="errorMsg">{errors.address.message}</p>)}<br /> */}
          {/* {errors.imageURL && (
            <p className="errorMsg">{errors.imageURL.message}</p>)} */}
          <input type="text" placeholder="imageURL" {...register("imageURL")} /><br />
          {/* {errors.phoneNumber && (
            <p className="errorMsg">{errors.phoneNumber.message}</p>)} */}
          <input type="text" placeholder="Description" {...register("description")} /><br />

          <button type="submit" className="BTNforns">Add Restaurnt</button>
        </form>
      }



      {updateRestaurant && <form onSubmit={handleSubmit(UpdateRestaurnt)} className="forms">
        <input type="text" placeholder="name" {...register("name")} /><br />
        {/* {errors.name && (
        <p className="errorMsg">{errors.name.message}</p>)} */}
        <input type="number" placeholder="phone number" {...register("phoneNumber")} /><br />
        {/* {errors.phoneNumber && (
        <p className="errorMsg">{errors.phoneNumber.message}</p>)} */}
        <input type="text" placeholder="Address" {...register("address")} /><br />
        {/* {errors.adderss && (
        <p className="errorMsg">{errors.address.message}</p>)}<br /> */}
        {/* {errors.imageURL && (
        <p className="errorMsg">{errors.imageURL.message}</p>)} */}
        <input type="text" placeholder="imageURL" {...register("imageURL")} /><br />
        {/* {errors.phoneNumber && (
        <p className="errorMsg">{errors.phoneNumber.message}</p>)} */}
        <input type="text" placeholder="Description" {...register("description")} /><br />

        <button type="submit" className="BTNforns">update Restaurnt</button>
      </form>



      }
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 10 }}
        sx={{ justifyContent: "flex-end" }}
      >
        {restaurants.map((restaurant) => (

          <Grid columnSpacing={2} rowSpacing={2} justifyContent="center" md={2} container key={restaurant.RestaurantID}>
            <Card variant="outlined" sx={{ width: 300 }} key={restaurant.RestaurantID}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <Link
                    overlay
                    href={`/user/${user.username}/${restaurant.RestaurantID}/restaurantMenu`}
                    state={{ infoResID: restaurant.RestaurantID }}
                    underline="none"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <img src={restaurant.ImageURL}
                      loading="lazy"
                      alt="">
                    </img>
                  </Link>
                  {isManager ? <span >
                    {/* <button onClick={() => deleteTheRestaurant(restaurant.id)}></button> */}
                    <Button onClick={() => deleteTheRestaurant(restaurant.id)} variant="outlined" color="neutral" >  🗑  </Button>
                  </span> : <></>}
                  {isManager ? <span >
                    <Button onClick={() => setUpdateRestaurant(true)} variant="outlined" color="neutral" >  🖊  </Button>
                  </span> : <></>}
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{restaurant.Name}</Typography>
                <Typography level="body-sm">{restaurant.Address}</Typography>
              </CardContent>
              <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
              </CardOverflow>
            </Card>
          </Grid>))}
      </Grid>

    </>
  )
}



// {
//   "RestaurantID": 1,
//   "Name": "a",
//   "Address": "aaa",
//   "PhoneNumber": "2222222222",
//   "ImageURL": "http://localhost:8080/img/restaurant/1.jpg",
//   "IsActive": 1,
//   "Description": "fffdfv"
// },


