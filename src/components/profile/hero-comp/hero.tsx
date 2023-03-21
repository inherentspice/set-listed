import React, {useEffect, useState} from "react";
import RachelLoo from "../../../media/home/rachel-profile-picture.png";
import DeniseFerguson from "../../../media/home/denise-profile-picture.png";
import "../../../styles/profiles/profile-hero.css";
import { ProfileCardData } from "../../../types/profile";
import { IconContext } from "react-icons";
import { SiTwitter, SiYoutube, SiInstagram, SiTiktok } from "react-icons/si";
import ErrorMessage from "../../error-message";
import { Connections } from "../../../types/my-network";
import ConnectionButton from "../../network/connection-button";
import ShowEditHeroBackground from "./Show-Edit-Hero-Background";
import ShowEditProfilePicture from "./Show-Edit-Profile-Picture";
import ShowEditProfileHeroInformation from "./Show-Edit-Hero-Information";
import HandleMessageClick from "./Handle-Message-Click";
import determineConnectionState from "./Determine-Connection-Status";



export default function ProfileHero(props: {profileCard: ProfileCardData[], userProfile: boolean, viewingUser: string, connections: Connections | undefined}) {
  const [expandedEditProfile, setExpandedEditProfile] = useState<string>("");
  const [expandedEditBackground, setExpandedEditBackground] = useState<string>("");
  const [expandedEditProfilePic, setExpandedEditProfilePic] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [profileCard, setProfileCard] = useState<ProfileCardData>(props.profileCard[0]);
  

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);



  useEffect(() => {
    determineConnectionState(props.connections, setConnectionStatus, props.profileCard);
  }, []);

  function handleEditProfileToggle(id: string): void{
    setExpandedEditProfile(expandedEditProfile == "" ? id : "");
  }

  function handleEditBackgroundToggle(id: string): void{
    setExpandedEditBackground(expandedEditBackground == "" ? id : "");
  }

  function handleEditProfilePictureToggle(id: string): void{
    if (props.userProfile) {
      setExpandedEditProfilePic(expandedEditProfilePic == "" ? id : "");
      handleEditProfileToggle("");
    }
  }

  return (
    <div className="profile-hero-cont comp">
      {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-hero-background-edit" onClick={() => handleEditBackgroundToggle(profileCard.id)}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>}
      <img className="profile-hero-background-img"
        src={profileCard.backgroundImage || "https://res.cloudinary.com/dhptcrsjc/image/upload/v1675955714/Set-Listed/default-background_wyziyb.png"}
        alt=""
      />
      <div className="profile-hero-profile-img-cont profile-picture-large" onClick={() => handleEditProfilePictureToggle(profileCard.id)}>
      <img
        className="profile-hero-profile-img profile-picture-large"
        src={profileCard.image}
        alt=""
      />
      <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-hero-user-picture-edit" onClick={() => handleEditProfileToggle(profileCard.id)}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
      </div>

      {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-hero-user-info-edit" onClick={() => handleEditProfileToggle(profileCard.id)}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg> }
      <div className="profile-hero-user-cont">
        <div className="profile-hero-user-info-cont">
          <div className="profile-hero-user-name-cont">
            <div className="profile-hero-user-name">{profileCard.firstName+" "+ profileCard.lastName}</div>
            <div className="profile-hero-divide"></div>
          </div>
          <div className='profile-hero-tagline'>{profileCard.tagline}</div>
          <div className='profile-hero-contact-cont'>
            <div className='profile-hero-location'>{`
              ${profileCard.city ? profileCard.city : "Nowhere"},
              ${profileCard.country ? profileCard.country : "Antartica"}`}</div>
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
          <div className='primary-button' onClick={() => HandleMessageClick(profileCard.user, props.viewingUser, setErr)}>Message</div>
          {connectionStatus !== "friend" && <ConnectionButton connectionStatus={connectionStatus} user={profileCard.user} viewingUser={props.viewingUser} setConnectionStatus={setConnectionStatus} setErr={setErr} />}


        </div>
        <div className="profile-hero-user-digital-footprint">
          <div>
            {profileCard.socials && profileCard.socials.map(item => {
              const socialMediaIndex = profileCard.socials.indexOf(item);
              return (
                <div className="digital-footprint-item">
                  <IconContext.Provider value={{ size: "1rem"}}>
                    {item == null ? null : socialMediaIndex == 0 ? <SiInstagram/> : socialMediaIndex == 1 ? <SiYoutube/> : socialMediaIndex == 2 ? <SiTiktok/> : <SiTwitter/>}
                  </IconContext.Provider>
                  {item == null ? null : <p>{item}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {expandedEditProfile && <ShowEditProfileHeroInformation profileCard={profileCard} handleEditProfileToggle={handleEditProfileToggle} err={err} />}
        {expandedEditBackground && <ShowEditHeroBackground profileCard={profileCard} setProfileCard={setProfileCard} handleEditBackgroundToggle={handleEditBackgroundToggle} err={err} setErr={setErr} />}
        {expandedEditProfilePic && <ShowEditProfilePicture profileCard={profileCard} handleEditProfilePictureTogge={handleEditProfilePictureToggle} err={err} setErr={setErr} setProfileCard={setProfileCard} />}
        {err && <ErrorMessage/>}
      </div>
      
    </div>
  );
}
