

import { useEffect, useState} from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import Login from './Login'
import Restaurant from './Restaurant'
import Registration from './Registration'
import RestaurantMenu from './RestaurantMenu.jsx';
import Order from './Order.jsx';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/user/:name/restaurant" element={<Restaurant />} />
          <Route path="/user/:name/:restaurantID/restaurantMenu" element={<RestaurantMenu />} />
          <Route path="/user/:name/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />}/>
          <Route path="*" element={<p>This site cannot be accessed</p>} />
        </Routes>
      </Router>
    </>
  )
}


export default App
