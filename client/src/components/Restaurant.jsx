import React, { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

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
export default function Restaurant() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }



  const { user } = useContext(UserContext);
  // const { userID } = useContext(UserContext);
  const name = JSON.parse(localStorage.getItem("currentUser")).Username;
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
    if (user == null) {
      navigate('/login')
    }
    getData();
  }, []);

  const [restaurants, setRestaurants] = useState([]);
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

  // const addRestaurant = () => {
  //   fetch(`http://localhost:8080/restaurant`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       Name: restaurants.name,
  //       Address: restaurants.address,
  //       PhoneNumber: restaurants.phoneNumber,
  //       ImageURL: restaurants.imageURL,
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  // }

  return (
    <>
      <h1>{name}</h1>
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 10 }}
        sx={{ justifyContent: "flex-end" }}
      >
        {restaurants.map((restaurant) => (
          <Grid xs={2} sm={4} md={4} key={restaurant.RestaurantID}>
            <Card variant="outlined" sx={{ width: 320 }} key={restaurant.RestaurantID}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <Link
                    overlay
                    href={`/user/${name}/${restaurant.RestaurantID}/restaurantMenu`}
                    state={{ infoResID: restaurant.RestaurantID }}
                    underline="none"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <img
                      src={restaurant.ImageURL}
                      loading="lazy"
                      alt=""
                    />
                  </Link>
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

