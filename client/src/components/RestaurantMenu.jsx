import React, { useRef, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { deleteReq, getByReq, postReq, getReq, updateReq } from "./fetch";
import { UserContext } from './UserProvider'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Cookies from 'js-cookie';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from "@mui/material";

function RestaurantMenu() {
  const { restaurantID } = useParams();
  const { user, setCurrentUser } = useContext(UserContext);
  const [menu, setMenu] = useState([]);
  const [currentMenu, setCurrentMenu] = useState([]);
  const [newItem, setNewItem] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const [menuDetails, setmenuDetails] = useState(false);
  const location = useLocation();
  const { detailRestuarant } = location.state;

  useEffect(() => {
    if (user == null) {
      navigate('/login')
    }
    getData();
  }, []);


  const getData = async () => {
    try {
      const data = await getByReq("restaurantMenu/RestaurantID", restaurantID);
      const menu = data.map(obj => ({ ...obj, "Quantity": 0 }))
      setMenu(menu);
      setCurrentMenu(data);
      user.isManager ? setIsManager(true) : setIsManager(false)
    }
    catch (err) {
      alert("Unable to enter data, please try again")
    }

  }


  function logOut() {
    if (confirm(user.username + ", are you sure you want to log out? ")) {
      const cookieNames = Object.keys(Cookies.get());
      cookieNames.forEach(cookieName => {
        Cookies.remove(cookieName);
      });
      setCurrentUser(null);
      navigate("/login");
    }
  }


  const deleteMenuItem = async (menuItemID) => {
    try {
      await deleteReq(`restaurantMenu/${restaurantID}/menuItemID`, menuItemID)
      setCurrentMenu(menuItem => menuItem.filter((item) => item.RestaurantMenuID !== menuItemID))
      setMenu(menuItem => menuItem.filter((item) => item.RestaurantMenuID !== menuItemID));
    }
    catch (err) {
      alert("Not successful, please try again.")
    }

  }

  const UpdateMenuItem = async (details) => {
    const body = {
      Name: details.name,
      Price: details.price,
      ImageURL: details.imageURL,
      Details: details.details,
    };
    try {
      await updateReq(`restaurantMenu/${restaurantID}/menuItemID`, body, menuDetails.RestaurantMenuID);

      const updatedMenu = [...menu];
      const index = updatedMenu.findIndex(it => it.RestaurantMenuID === menuDetails.RestaurantMenuID);

      if (index !== -1) {
        updatedMenu[index] = { ...updatedMenu[index], ...body };
      }

      setMenu(updatedMenu);
      setCurrentMenu(updatedMenu);
      setUpdateItem(false);
    }
    catch (err) {
      alert("Not successful, please try again.")
    }

  };
  const addItem = async (details) => {
    try {
      let post = await postReq(`restaurantMenu/${restaurantID}`, {
        restaurantID: restaurantID,
        Name: details.name,
        Price: details.price,
        ImageURL: details.imageURL,
        Details: details.details,
      });
      Object.assign(post.data, { "Quantity": 0 })
      setMenu(prevMenu => [...prevMenu, post.data]);
      setCurrentMenu(prevMenu => [...prevMenu, post.data])
      setNewItem(false)
    }
    catch (err) {
      alert("Not successful, please try again.")
    }

  }

  const AddQuantity = (item) => {
    setMenu(menu => menu.map(it => {
      if (it == item)
        it.Quantity += 1;
      return it
    }))
  }

  function updateCurrentItem(item) {
    setUpdateItem(true);
    setmenuDetails(item);
  }

  const saveOrder = () => {
    let copyMenu = [];
    for (let i = 0; i < menu.length; i++) {
      copyMenu.push(menu[i]);
    }
    copyMenu = copyMenu.filter(item => item.Quantity != 0)
    if (copyMenu.length == 0)
      alert("There are no items selected")
    else
      navigate(`/user/${user.username}/order`, { state: copyMenu });
  }

  const RemoveQuantity = (item) => {
    setMenu(menu => menu.map(it => {
      if (it == item)
        if (it.Quantity == 0)
          it.Quantity = 0;
        else it.Quantity -= 1;
      return it;
    })
    )
  }
  const sortByPrice = () => {
    setMenu(menu => menu.sort(
      (p1, p2) => (p1.Price > p2.Price) ? 1 : (p1.Price < p2.Price) ? -1 : 0));
    setCurrentMenu(menu);
  }

  const searchByName = (search) => {
    setMenu(currentMenu.filter((item) => item.Name.includes(search.name)));
  }

  return (

    <>

      <AspectRatio variant="outlined" maxHeight={300} sx={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "100%", width: "100%", backgroundImage: `url(${detailRestuarant.restaurant.ImageURL})`, backgroundSize: "cover" }}>
          <CardContent>
            <Typography textColor="#FFCC99" level="h1">{detailRestuarant.restaurant.Name}</Typography>
            <Typography textColor="#FFCC99" level="h2">{detailRestuarant.restaurant.Description}</Typography>
            <Typography textColor="#FFCC99" level="h3">{detailRestuarant.restaurant.Address}</Typography>
            <Typography textColor="#FFCC99" level="h4">{detailRestuarant.restaurant.PhoneNumber}</Typography>
          </CardContent>
        </Box>
      </AspectRatio>
      <Button onClick={sortByPrice}>sort by price</Button>
      <form onSubmit={handleSubmit(searchByName)} className="forms">
        <input type="text" placeholder="search by name" {...register("name")} /></form>

      {isManager ? <Button onClick={() => newItem ? setNewItem(false) : setNewItem(true)} variant="outlined" color="neutral" >New Item</Button> : <></>}
      {newItem && <form onSubmit={handleSubmit(addItem)} className="forms">
        <input type="text" placeholder="name" defaultValue={menuDetails.Name} {...register("name")} />
        <input type="number" placeholder="price"  {...register("price")} />
        <input type="text" placeholder="imageURL"  {...register("imageURL")} />
        <input type="text" placeholder="details"  {...register("details")} />
        <button type="submit" className="BTNforns">Add Item</button>
      </form>
      }



      {updateItem && <form onSubmit={handleSubmit(UpdateMenuItem)} className="forms">
        <input type="text" placeholder="name" defaultValue={menuDetails.Name} {...register("name")} />
        <input type="number" placeholder="price" defaultValue={menuDetails.Price} {...register("price")} />
        <input type="text" placeholder="imageURL" defaultValue={menuDetails.ImageURL} {...register("imageURL")} />
        <input type="text" placeholder="details" defaultValue={menuDetails.Details} {...register("details")} />
        <button type="submit" className="BTNforns">update Item</button>
      </form>}

      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 10 }}
        sx={{ justifyContent: "flex-start" }}
      >
        {menu.map((item) => (
          <Grid columnSpacing={2} rowSpacing={2} justifyContent="center" key={item.RestaurantMenuID}>
            <Card color="primary" variant="outlined" sx={{ width: 200 }} key={item.RestaurantMenuID} >
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src={item.ImageURL}
                    loading="lazy"
                    alt=""
                  />
                  {isManager ? <span >
                    <Button onClick={() => deleteMenuItem(item.RestaurantMenuID)} variant="solid" color="neutral" >  🗑  </Button>
                  </span> : <></>}
                  {isManager ? <span >
                    <Button onClick={() => updateCurrentItem(item)} variant="solid" color="neutral" >  🖊  </Button>
                  </span> : <></>}
                </AspectRatio>
              </CardOverflow>
              <ButtonGroup aria-label="Basic button group">
                <Button onClick={() => AddQuantity(item)} variant="outlined" color="neutral" >+
                </Button>
                {item.Quantity ? <Typography align="center" color="warning" sx={{ width: 200 }} level="title-md">{item.Quantity}</Typography> : <></>}
                {item.Quantity ? <Button onClick={() => RemoveQuantity(item)} variant="outlined" color="neutral" >-
                </Button> : <></>}
              </ButtonGroup>
              <CardContent>
                <Typography level="title-md">{item.Name}</Typography>
                <Typography level="title-md">{item.Price + "₪"}</Typography>
                <Typography level="body-sm">{item.Details}</Typography>
              </CardContent>
            </Card>
          </Grid>))}
      </Grid>
      <Button endDecorator={<KeyboardArrowRight />} onClick={() => saveOrder()} color="success">
        Completion of order 🛒
      </Button>
      <Button onClick={logOut}>Log Out</Button>
    </>

  )
};

export default RestaurantMenu