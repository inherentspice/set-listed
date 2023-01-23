import React from "react";
import "../styles/header.css";
import Home from "../media/icons/home.png";
import MyNetwork from "../media/icons/my-network.png";
import Gigs from "../media/icons/gigs.png";
import Messaging from "../media/icons/messaging.png";
import Notifications from "../media/icons/notifications.png";
import ProfilePic from "../media/home/profile-picture.png";
import Search from "../media/icons/search.png";
import Services from "../media/icons/services.png";

export default function Header() {
  return(
    <div>
      <div className="header-cont">
        <div className="header-nav-left">
          <div className='header-nav-search'>
            <div className="header-cont-logo">SL</div>
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

            <a href='/my-profile' className="header-nav-btn">
              <img className='header-nav-profile-pic' src={ProfilePic} alt=""/>
              <div className="header-nav-btn-name">My Profile</div>
            </a>
          </div>

        </div>

        <div className="header-nav-right">

          <a href='/services' className="header-nav-menu">
            <img src={Services} alt=""/>
            <div>Services</div>
          </a>
          <div className='header-nav-right-cta'><a href="/">Try Premium for Free you Brokie</a></div>

        </div>
      </div>
    </div>
  );
}
