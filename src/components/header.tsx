import React, { useEffect, useState } from "react";
import "../styles/header.css";
import Home from "../media/icons/home.png";
import MyNetwork from "../media/icons/my-network.png";
import Gigs from "../media/icons/gigs.png";
import Messaging from "../media/icons/messaging.png";
import Notifications from "../media/icons/notifications.png";
import Search from "../media/icons/search.png";
import Services from "../media/icons/services.png";
import LogoutIcon from "../media/icons/logout.png";
import AuthService from "../services/home/auth";
import { useUserId } from "../context/userIdContext";
import ProfileService from "../services/home/profile";

export default function Header() {
  const { userId, setUserId } = useUserId();
  const [ profile, setProfile] = useState<string>("");

  useEffect(() => {
    (async function(){
      const user = await AuthService.checkSession();
      const profile = await ProfileService.getProfileCard(user.data.user);
      setProfile(profile.data.profileCard[0].image);
      setUserId(user.data.user);
    }());
  }, [userId, setUserId]);

  function handleLogout(): void {
    AuthService.logout();
  }

  return(
    <div className="header">
      <div className="header-cont">
        <div className="header-nav-left">
          <div className='header-nav-search'>
            <a href="../"><div className="header-cont-logo">SL</div></a>
            <div className="header-cont-search">
              <img src={Search} alt=""/>
              <input placeholder='Search'></input>
            </div>
          </div>

          <div className="header-nav-btns">
            <a href='/' className="header-nav-btn">
              <img className='header-nav-img' src={Home} alt=""/>
              <div className="header-nav-btn-name">Home</div>
            </a>

            <a href='/my-network' className="header-nav-btn">
              <img className='header-nav-img' src={MyNetwork} alt="" />
              <div className="header-nav-btn-name">My Network</div>
            </a>

            <a href='/gigs' className="header-nav-btn">
              <img className='header-nav-img' src={Gigs} alt=""/>
              <div className="header-nav-btn-name">Gigs</div>
            </a>

            <a href='/messaging' className="header-nav-btn">
              <img className='header-nav-img' src={Messaging} alt=""/>
              <div className="header-nav-btn-name">Messaging</div>
            </a>

            <a href='/notifications' className="header-nav-btn">
              <img className='header-nav-img' src={Notifications} alt=""/>
              <div className="header-nav-btn-name">Notifications</div>
            </a>

            {userId && <a href={`/user/${userId}`} className="header-nav-btn">
              <img className='header-nav-profile-pic' src={profile} alt=""/>
              <div className="header-nav-btn-name">My Page</div>
            </a>}
          </div>
        </div>

        <div className="header-nav-right">
          <a href='/services' className="header-nav-btn">
            <img className="header-nav-img" src={Services} alt=""/>
            <div className="header-nav-btn-name">Services</div>
          </a>
          <a href="/login" className="header-nav-btn" onClick={handleLogout}>
            <img className="header-nav-img" src={LogoutIcon} alt=""/>
            <div className="header-nav-btn-name">Logout</div>
          </a>
          {/* <div className='header-nav-right-cta'>
            <a href="/">Try Premium for Free you Brokie</a>
          </div> */}

        </div>
      </div>
    </div>
  );
}
