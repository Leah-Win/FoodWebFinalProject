import React, { useRef, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { deleteReq, postReq, getReq, updateReq } from "./fetch";
import './css/resturants.css'
import { UserContext } from './UserProvider'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [updateRestaurant, setUpdateRestaurant] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();

  useEffect(() => {
    console.log(user)
    if (user == null) {
      navigate('/login')
    }
    getData();
  }, []);

  useEffect(() => {
  }, [restaurants]);

  const getData = async () => {
    const data = await getReq("restaurant");
    setRestaurants(data);
  };

  const deleteRestaurant = async (restaurantID) => {
    await deleteReq("restaurant", restaurantID)
    setRestaurants(restaurant => restaurant.filter((item) => item.RestaurantID !== restaurantID)
    )
  }

  const UpdateRestaurnt = async (details) => {
    const body = {
      Name: details.name,
      Address: details.address,
      PhoneNumber: details.phoneNumber,
      ImageURL: details.imageURL,
      Description: details.description
    }
    updateReq("restaurant", body, restaurantDetails.RestaurantID)
    let res = [];
    for (let i = 0; i < restaurants.length; i++) {
      res.push(restaurants[i]);
    }
    res.map(it => {
      if (it.RestaurantID == restaurantDetails.RestaurantID) {
        it.RestaurantID = restaurantDetails.RestaurantID;
        it.Name = details.name;
        it.Address = details.address;
        it.PhoneNumber = details.phoneNumber;
        it.ImageURL = details.imageURL;
        it.Description = details.description;
      }
    })
    setRestaurants(res)
    setUpdateRestaurant(false)
  }

  const addRestaurant = async (details) => {

    let post = await postReq("restaurant", {
      Name: details.name,
      Address: details.address,
      PhoneNumber: details.phoneNumber,
      ImageURL: details.imageURL,
      Description: details.description
    });
    setRestaurants(prevRestaurants => [...prevRestaurants, post.data]);
    setNewRestaurant(false)
  }

  function updateCurrentRestaurant(restaurant) {
    setUpdateRestaurant(true);
    setRestaurantDetails(restaurant);
  }

  return (
    <>
      <h1>{user.username}</h1>
      {isManager ? <Button onClick={() => newRestaurant ? setNewRestaurant(false) : setNewRestaurant(true)} variant="outlined" color="neutral" >New Restaurnt</Button> : <></>}
      {
        newRestaurant && <form onSubmit={handleSubmit(addRestaurant)} className="forms">
          <input type="text" placeholder="name" {...register("name")} />
          <input type="number" placeholder="phone number" {...register("phoneNumber")} />
          <input type="text" placeholder="Address" {...register("address")} />
          <input type="text" placeholder="imageURL" {...register("imageURL")} />
          <input type="text" placeholder="Description" {...register("description")} />
          <button type="submit" className="BTNforns">Add Restaurnt</button>
        </form>
      }

      {updateRestaurant && <form onSubmit={handleSubmit(UpdateRestaurnt)} className="forms">
        <input type="text" placeholder="name" defaultValue={restaurantDetails.Name} {...register("name")} />
        <input type="number" placeholder="phone number" defaultValue={restaurantDetails.PhoneNumber} {...register("phoneNumber")} />
        <input type="text" placeholder="Address" defaultValue={restaurantDetails.Address} {...register("address")} />
        <input type="text" placeholder="imageURL" defaultValue={restaurantDetails.ImageURL} {...register("imageURL")} />
        <input type="text" placeholder="Description" defaultValue={restaurantDetails.Description} {...register("description")} />
        <button type="submit" className="BTNforns">update Restaurnt</button>
      </form>}

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
                    to={`/user/${user.userObject.username}/${restaurant.RestaurantID}/restaurantMenu`}
                    state={{ detailRestuarant: { restaurant } }}
                  >
                    <img src={restaurant.ImageURL}
                      loading="lazy"
                      alt="">
                    </img>
                  </Link>
                  {isManager ? <span >
                    <Button onClick={() => deleteRestaurant(restaurant.RestaurantID)} variant="outlined" color="neutral" >  🗑  </Button>
                  </span> : <></>}
                  {isManager ? <span >
                    <Button onClick={() => updateCurrentRestaurant(restaurant)} variant="outlined" color="neutral" >  🖊  </Button>
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
      </Grid >
    </>
  )
}
