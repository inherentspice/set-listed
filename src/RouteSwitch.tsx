import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gigs from "./pages/gigs";
import Messaging from "./pages/messaging";
import MyNetwork from "./pages/my-network";
import BuildProfilePage from "./pages/my-profile";
import Notifications from "./pages/notifications";
import Header from "./components/header/header";
import RequireAuth from "./components/require-auth";
import Login from "./pages/login";
import { UserIdProvider } from "./context/userIdContext";


export default function RouteSwitch() {

  return(
    <UserIdProvider>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>}
         />
        <Route path='/gigs' element={<Gigs />} />
        <Route path='/messaging' element={<Messaging />} />
        <Route path='/my-network' element={<MyNetwork />} />
        <Route path='/user/:profileid' element={<BuildProfilePage />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Login />} />
      </Routes>
    </BrowserRouter>
    </UserIdProvider>
  );
}
