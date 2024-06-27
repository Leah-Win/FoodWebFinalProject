import React, { useRef, useContext, useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom'
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

const  addRestaurant=()=>{
    fetch(`http://localhost:8080/restaurant`, {
        method: 'POST',
        body: JSON.stringify({
          Name: restaurants.name,
          Address: restaurants.address,
          PhoneNumber: restaurants.phoneNumber,
          ImageURL: restaurants.imageURL,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
}

        // const columns = Object.keys(restaurants[0] || {}).map(key => ({
        //     field: key,
        //     header: key.charAt(0).toUpperCase() + key.slice(1)
        // }));
        // const ExpandMore = styled((props) => {
        //     const { expand, ...other } = props;
        //     return <IconButton {...other} />;
        //   })(({ theme, expand }) => ({
        //     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        //     marginLeft: 'auto',
        //     transition: theme.transitions.create('transform', {
        //       duration: theme.transitions.duration.shortest,
        //     }),
        //   }));
          
        
        
    return (
        <>

<h1>{name}</h1>
{restaurants.map((restaurant)=>(
<Card variant="outlined" sx={{ width: 320 }} key={restaurant.RestaurantID}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={restaurants.imageURL}
            // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{restaurant.Name}</Typography>
        <Typography level="body-sm">{restaurant.Address}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        {/* <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            6.3k views
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            1 hour ago
          </Typography>
        </CardContent> */}
      </CardOverflow>
    </Card>))}
{/* <Stack direction="row" spacing={3}>

{restaurants.map((restaurant)=>(
    <Card key={restaurant.RestaurantID}>

<Link
    overlay="true"
    href="/login"
    underline="none"
  >
eeeeeeeeeeee
</Link>

              <Link overlay="true" href='#Home' underline="none">

      <CardHeader title={restaurant.Name} subheader={restaurant.Address} />
      <CardMedia
        component="img"
        height="100"
        width="200"
        image={restaurant.imageURL}
        // alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"/>
      </CardContent>
        <CardContent>
          <Typography paragraph>
          {restaurant.Description}
          </Typography>
         
        </CardContent>
        </Link>

    </Card>
    
  ))}
  
  </Stack>
             */}
            
            {/* <h1>{user.username}</h1> */}
         
    
            {/* <DataTable value={restaurants} tableStyle={{ minWidth: '50rem' }}>
    <Column field="address" header="Address"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="phoneNamber" header="PhoneNamber"></Column>
    <Column field="imageUrl" header="ImageUrl"></Column>
</DataTable> */}



{/* <DataTable value={restaurants} tableStyle={{ minWidth: '50rem' }}>
            {columns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} />
            ))}
        </DataTable> */}
       
        </>
    )
}



// {restaurants.map((restaurant) => {
//     return <div key={restaurants.id}>
//         <div>
//             <span>restaurant Id:{restaurant.id}</span>
//             <span>{restaurant.name}</span>
//             <span>{restaurant.address}</span>
//             <span>{restaurant.phonenumber}</span>
//             {/* <span>{restaurant.name}</span> */}

//         </div>

//     </div>
// })}



// function ObjectArrayComponent({ arrayOfObjects }) {
//     return (
  
//     );
// useEffect(() => {
//     if (user == null) {
//         navigate('/login')
//     }
//     getData();
// }, []);

// const [restaurants, setRestaurants] = useState([]);

// useEffect(() => {
//     console.log("Restaurants updated:", restaurants);
// }, [restaurants]);

// const getData = () => {
//     console.log("Fetching data...");
//     fetch(`http://localhost:8080/restaurant`)
//         .then(response => response.json())
//         .then(data => {
//             setRestaurants(data);
//             console.log("Fetched data:", data);
//         })
//         .catch(error => console.error("Error fetching data:", error));
// };

