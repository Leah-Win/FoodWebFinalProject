import React, { useRef, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
// import { UserContext } from '
import { UserContext } from './UserProvider'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import Add from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
function RestaurantMenu() {
  const {restaurantID}=useParams();
  console.log(restaurantID);
  const { user } = useContext(UserContext);
  // const { userID } = useContext(UserContext);
  const name = JSON.parse(localStorage.getItem("currentUser")).Username;
  const [menu, setMenu] = useState([]);
  const [currentMenu, setCurrentMenu] = useState([]);


  const navigate = useNavigate()
  useEffect(() => {
    if (user == null) {
      navigate('/login')
    }
    getData();
  }, []);


  // useEffect(() => {
  // }, [menu]);

  const getData = () => {
    fetch(`http://localhost:8080/restaurantMenu/RestaurantID/${restaurantID}`)
      .then(response => response.json())
      .then(data => {
        const menu = data.map(obj => ({ ...obj, "Quantity": 0 }))
        console.log(menu);
        setMenu(menu);
      }).then(data => setCurrentMenu(data))

    // .catch(error => console.error("Error fetching data:", error));
  }


  // const  addRestaurant=()=>{
  //     fetch(`http://localhost:8080/restaurant`, {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           Name: menu.name,
  //           Price: menu.Price,
  //           ImageURL: menu.ImageURL,
  //           Details: menu.Details,
  //         }),
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //         },
  //       })
  const AddItem = (item) => {
    setMenu(menu => menu.map(it => { if (it == item) it.Quantity += 1; return it })
    )
    console.log(menu)

  }

  const RemoveItem = (item) => {
    setMenu(menu => menu.map(it => {
      if (it == item)
        if (it.Quantity == 0)
          it.Quantity = 0;
        else it.Quantity -= 1;
      return it;
    })
    )
  }
  return (

    <>
      <h1>{name}</h1>
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 10 }}
        sx={{ justifyContent: "flex-start" }}
      >
        {menu.map((item) => (
          <Grid xs={2} sm={4} md={4} key={item.RestaurantMenuID}>
            <Card color="primary" variant="outlined" sx={{ width: 250 }} key={item.RestaurantMenuID} >
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src={item.ImageURL}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <Button onClick={() => AddItem(item)} variant="outlined" color="neutral" >+
              </Button>
              {item.Quantity}
              <Button onClick={() => RemoveItem(item)} variant="outlined" color="neutral" >-
              </Button>
              <CardContent>
                <Typography level="title-md">{item.Name}</Typography>
                <Typography level="title-md">{item.Price + "₪"}</Typography>
                <Typography level="body-sm">{item.Details}</Typography>
              </CardContent>
              {/* <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
              </CardOverflow> */}
            </Card>
          </Grid>))}
      </Grid>
      <Button endDecorator={<KeyboardArrowRight />} color="success">
            Completion of order
      <Link
                    overlay
                    href={`/user/${name}/order`}
                    // state={{ infoResID: restaurant.RestaurantID }}
                    underline="none"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      
      </Link>
      </Button>

    </>
  )
};

export default RestaurantMenu