import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gigs from "./pages/gigs";
import Messaging from "./pages/messaging";
import MyNetwork from "./pages/my-network";
import MyProfile from "./pages/my-profile";
import Notifications from "./pages/notifications";

export default function RouteSwitch() {
    return(
        <BrowserRouter>
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