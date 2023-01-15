import React from "react";
import Profile from "../../media/home/profile-picture.png";

export default function Advertisement() {
  return (
    <div className="home-ad-cont home-comp">
      <div className="ad-info-cont">
        <p>Ad</p>
      </div>
      <p className="ad-sub-heading">Get the latest gigs and industry news</p>
      <div className="ad-content-cont">
        <img src={Profile} alt="" className="profile-picture-medium"/>
        <img src={Profile} alt="" className="profile-picture-medium"/>
      </div>
      <p className="ad-cta">Name, explore more relevant oppurtunities with <b>Company</b></p>
      <button>Follow</button>
    </div>
  );
}
