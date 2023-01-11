import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gigs from "./pages/gigs";
import Messaging from "./pages/messaging";
import MyNetwork from "./pages/my-network";
import MyProfile from "./pages/my-profile";
import Notifications from "./pages/notifications";
import Header from "./components/header";

export default function RouteSwitch() {
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/gigs' element={<Gigs />} />
        <Route path='/messaging' element={<Messaging />} />
        <Route path='/my-network' element={<MyNetwork />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/notifications' element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  )
}
