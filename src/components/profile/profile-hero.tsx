import React from "react";
import { FakeUserData } from "../../dummy-data/fake-users";
import "../../styles/profile-hero.css";

export default function ProfileHero() {
  return(
    <div className="profile-hero-cont">
      <img className="profile-hero-background-img" src={FakeUserData.userBackgroundPicture} alt=""/>
      <img className="profile-hero-profile-img" src={FakeUserData.userProfilePicture} alt="" />
      <div className="profile-hero-user-name">{FakeUserData.userFirstName+" "+ FakeUserData.userLastName}</div>
      <div className='profile-hero-tagline'>{FakeUserData.userTagline}</div>
      <div className='profile-hero-performer-type'>Comedian</div>
      <div className='profile-hero-contact-cont'>
        <div className='profile-hero-location'>{FakeUserData.city+", "+FakeUserData.country}</div>
        <div className='profile-hero-contact'>Contact Info</div>
      </div>
      <div className='profile-hero-connections'>500+ connections</div>
      <div className='profile-hero-mutual-connections-cont'>
        <div className='profile-hero-mutual-connections-imgs'></div>
        <div className='profile-hero-mutual-connections-names'>John Doe, Stevie Smiff</div>
      </div>
      <div className='profile-hero-message'>Message</div>
    </div>
  )
}
