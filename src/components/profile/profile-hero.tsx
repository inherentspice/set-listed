import React from "react";
import { FakeUserData } from "../../dummy-data/fake-users";
import RachelLoo from "../../media/home/rachel-profile-picture.png";
import DeniseFerguson from "../../media/home/denise-profile-picture.png";
import "../../styles/profile-hero.css";
import Follower from "../../media/icons/follower.png";

export default function ProfileHero() {

  return(
    <div className="profile-hero-cont">
      <img className="profile-hero-background-img" src={FakeUserData.userBackgroundPicture} alt=""/>
      <img className="profile-hero-profile-img" src={FakeUserData.userProfilePicture} alt="" />
      <div className="profile-hero-user-cont">
        <div className="profile-hero-user-info-cont">
          <div className="profile-hero-user-name-cont">
            <div className="profile-hero-user-name">{FakeUserData.userFirstName+" "+ FakeUserData.userLastName}</div>
            <div className='profile-hero-performer-type'>| Improv Comedian</div>

          </div>
          <div className='profile-hero-tagline'>{FakeUserData.userTagline}</div>
          <div className='profile-hero-contact-cont'>
            <div className='profile-hero-location'>{FakeUserData.city+", "+FakeUserData.country}</div>
            <div className='profile-hero-contact'>Contact Info</div>
          </div>
          <div className='profile-hero-connections'>500+ connections</div>
          <div className='profile-hero-mutual-connections-cont'>
            <div className='profile-hero-mutual-connections-imgs'>
              <img className="profile-hero-mutual-connection-img" alt="pic" src={RachelLoo} />
              <img className="profile-hero-mutual-connection-img overlap" alt="pic" src={DeniseFerguson} />
            </div>
            <div className='profile-hero-mutual-connections-names'><a href='./my-profile'>2 Mutual Connections: Rachel Loo and Denise Ferguson</a></div>
          </div>
          <div className='profile-hero-message'>Message</div>
        </div>
        <div className="profile-hero-user-digital-footprint">
          <div>
            {FakeUserData.socialMedia.map(item => {
              return (
                <div className="profile-hero-user-digital-footprint-item" key={item.id} >
                  <img className="profile-hero-user-digital-footprint-img" src={item.img} alt=""/>
                  <div className="profile-hero-user-digital-footprint-username">{item.username}</div>
                  <img className="profile-her-user-digital-footprint-follower-img" src={Follower} alt="" />
                  <div className="profile-hero-user-digital-footprint-followers">{item.followers}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
