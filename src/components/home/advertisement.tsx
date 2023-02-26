import React from "react";
import Profile from "../../media/home/profile-picture.png";
import "../../styles/home/advertisement.css";

export default function Advertisement(props: {profileImg: string}) {
  if (!props.profileImg) {
    return (
      <div className="home-ad-cont comp loading-ad loading"></div>
    );
  }
  return (
    <div className="home-ad-cont comp">
      <div className="ad-info-cont">
        <p>Ad</p>
      </div>
      <p className="ad-sub-heading">Get the latest gigs and industry news</p>
      <div className="ad-content-cont">
        <img src={props.profileImg} alt="" className="profile-picture-medium"/>
        <img src={Profile} alt="" className="profile-picture-medium"/>
      </div>
      <p className="ad-cta">Name, explore more relevant oppurtunities with <b>Company</b></p>
      <button className="primary-button">Follow</button>
    </div>
  );
}
