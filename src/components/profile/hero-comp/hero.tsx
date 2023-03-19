import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import RachelLoo from "../../media/home/rachel-profile-picture.png";
import DeniseFerguson from "../../media/home/denise-profile-picture.png";
import "../../styles/profiles/profile-hero.css";
import { ProfileCardData } from "../../../types/profile";
import ProfileService from "../../../services/home/profile";
import { useNavigate } from "react-router-dom";
import MessagingService from "../../../services/home/messaging";
import { IconContext } from "react-icons";
import { SiTwitter, SiYoutube, SiInstagram, SiTiktok } from "react-icons/si";
import ErrorMessage from "../../error-message";
import { Connections } from "../../../types/my-network";
import ConnectionService from "../../../services/home/connection";
import ConnectionButton from "../../network/connection-button";
import ShowEditHeroBackground from "./Show-Edit-Hero-Background";
import ShowEditProfilePicture from "./Show-Edit-Profile-Picture";



export default function ProfileHero(props: {profileCard: ProfileCardData[], userProfile: boolean, viewingUser: string, connections: Connections | undefined}) {
  const [expandedEditProfile, setExpandedEditProfile] = useState<string>("");
  const [expandedEditBackground, setExpandedEditBackground] = useState<string>("");
  const [expandedEditProfilePic, setExpandedEditProfilePic] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [profileCard, setProfileCard] = useState<ProfileCardData>(props.profileCard[0]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);

  function determineConnectionState() {
    if (props.connections === undefined) {
      setConnectionStatus("friend");
      return;
    }
    const isFriend = props.connections.friends.filter((friend) => profileCard.user === friend.id).length > 0;
    const friendRequestSent = props.connections.pending.filter((friend) => profileCard.user === friend.id).length > 0;
    const isRequestingFriend = props.connections.waiting.filter((friend) => profileCard.user === friend.id).length > 0;
    if (isFriend) {
      setConnectionStatus("friend");
    } else if (friendRequestSent) {
      setConnectionStatus("Pending");
    } else if (isRequestingFriend) {
      setConnectionStatus("Confirm Request");
    } else {
      setConnectionStatus("Connect+");
    }
  }

  useEffect(() => {
    determineConnectionState();
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

  async function handleEditBackgroundSubmit(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
      imageUpload: File | null
    ): Promise<void> {
        try{
            e.preventDefault();
            if (!imageUpload) {
                setErr(true);
                return;
              }
              const formData = new FormData();
              formData.append("image", imageUpload);
              const newImage = await ProfileService.editBackground(formData, profileCard.user);
              setProfileCard(newImage.data.profileCard);
              handleEditBackgroundToggle("");
        } catch(err) {
            setErr(true)
            return Promise.reject();
        }
    }

  async function handleEditHeroSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    socials: string[],
    tagline: string,
    ): Promise<void> {
        try{
            e.preventDefault();
            const formData = { 
                firstName,
                lastName,
                country,
                city,
                socials,
                tagline,
            };
            const editedHero = await ProfileService.editHero(formData, profileCard.user);
            setProfileCard(editedHero.data.profileCard);
            handleEditProfileToggle("");
        } catch(err) {
            setErr(true)
            return Promise.reject();
        }
    }

  async function handleEditProfilePicSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUpload: File | null
  ): Promise<void> {
      try{
        e.preventDefault();
        if (!imageUpload) {
            setErr(true);
            return;
        }
        const formData = new FormData();
        formData.append("image", imageUpload);
        const newImage = await ProfileService.editProfilePic(formData, profileCard.user);
        setProfileCard(newImage.data.profileCard);
        handleEditProfilePictureToggle("");
      } catch(err) {
          setErr(true)
          return Promise.reject();
      }
  }

  // update to route directly to message
  async function handleMessageClick(profileUser: string, viewingUser: string): Promise<void>{
    try {
      const formObject = {
        userId: viewingUser,
        friendId: profileUser
      };
      await MessagingService.createRoom(formObject);
      navigate("/messaging");
      return Promise.resolve();
    } catch (err) {
      setErr(true);
      return Promise.reject(err);
    }
  }

  async function handleConnectionClick(
    user: string,
    viewingUser: string
  ): Promise<void>{
    try {
      const formObject = {
        friendId: user
      };
      await ConnectionService.sendRequest(formObject, viewingUser);
      setConnectionStatus("Friend Request Pending");
      return Promise.resolve();
    } catch (err) {
      setErr(true);
      return Promise.reject(err);
    }
  }



  function ShowEditProfileHero() {
    const [firstName, setFirstName] = useState<string>(profileCard.firstName || "");
    const [lastName, setLastName] = useState<string>(profileCard.lastName || "");
    const [country, setCountry] = useState<string>(profileCard.country || "");
    const [city, setCity] = useState<string>(profileCard.city || "");
    const [tagline, setTagline] = useState<string>(profileCard.tagline || "");
    const [socials, setSocials] = useState<string[]>(profileCard.socials || ["", "", "", ""]);

    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setFirstName(e.target.value);
    }

    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setLastName(e.target.value);
    }

    function handleCountryChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setCountry(e.target.value);
    }

    function handleCityChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setCity(e.target.value);
    }

    function handleTaglineChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setTagline(e.target.value);
    }

    function handleSocialsChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void{
      const newSocials = [...socials];
      newSocials[index] = e.target.value;
      setSocials(newSocials);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={profileCard.id} onClick={() => handleEditProfileToggle("")}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h1 className="expanded-profile-overlay-header-title">Edit Your Info</h1>
            <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 96 960 960" width="35" className="profile-overlay-header-button" onClick={() => handleEditProfileToggle("")}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <form className="edit-profile-hero-form">
            <h2>Basic Information</h2>
            <label className="edit-profile-hero-form-item">
              <p>First Name</p>
              <input type="text" value={firstName} onChange={handleFirstNameChange}></input>
            </label>

            <label className="edit-profile-hero-form-item">
              <p>Last Name</p>
              <input type="text" value={lastName} onChange={handleLastNameChange}></input>
            </label>

            <label className="edit-profile-hero-form-item">
              <p>Tagline</p>
              <input type="text" value={tagline} onChange={handleTaglineChange} maxLength={50}></input>
            </label>

            <label className="edit-profile-hero-form-item">
              <p>City</p>
              <input type="text" value={city} onChange={handleCityChange}></input>
            </label>

            <label className="edit-profile-hero-form-item">
              <p>Country</p>
              <input type="text" value={country} onChange={handleCountryChange}></input>
            </label>

            <h2>Social Media</h2>
            <label className="edit-profile-hero-form-item">
              <div className="edit-profile-social-label">
              <IconContext.Provider value={{ size: "1rem"}}>
                <SiInstagram/>
              </IconContext.Provider>
              <p>Instagram</p>
              </div>

              <input type="text" value={socials[0] ? socials[0] : ""} onChange={(e) => handleSocialsChange(e, 0)}></input>
            </label>

            <label className="edit-profile-hero-form-item">
              <div className="edit-profile-social-label">
              <IconContext.Provider value={{ size: "1rem"}}>
                <SiYoutube/>
              </IconContext.Provider>
              <p>YouTube</p>
              </div>
              <input type="text" value={socials[1] ? socials[1] : ""} onChange={(e) => handleSocialsChange(e, 1)}></input>
            </label>

            <label className="edit-profile-hero-form-item">
            <div className="edit-profile-social-label">
              <IconContext.Provider value={{ size: "1rem"}}>
                <SiTiktok/>
              </IconContext.Provider>
              <p>Tik Tok</p>
              </div>
              <input type="text" value={socials[2] ? socials[2] : ""} onChange={(e) => handleSocialsChange(e, 2)}></input>
            </label>

            <label className="edit-profile-hero-form-item">
            <div className="edit-profile-social-label">
              <IconContext.Provider value={{ size: "1rem"}}>
                <SiTwitter/>
              </IconContext.Provider>
              <p>Twitter</p>
              </div>
              <input type="text" value={socials[3] ? socials[3] : ""} onChange={(e) => handleSocialsChange(e, 3)}></input>
            </label>

            <div className="expanded-profile-overlay-submit">
                <button
                  className="primary-button"
                  type="submit"
                  onClick={(e) => handleEditHeroSubmit(e, firstName, lastName, country, city, socials, tagline)}
                >Save</button>
            </div>
          </form>
          {err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
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
          <div className='primary-button' onClick={() => handleMessageClick(profileCard.user, props.viewingUser)}>Message</div>
          {connectionStatus !== "friend" && <ConnectionButton connectionStatus={connectionStatus} user={profileCard.user} viewingUser={props.viewingUser} handleConnectionClick={handleConnectionClick}/>}


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
        {expandedEditProfile && <ShowEditProfileHero />}
        {expandedEditBackground && <ShowEditHeroBackground profileCard={profileCard} handleEditBackgroundToggle={handleEditBackgroundToggle} handleEditBackgroundSubmit={handleEditBackgroundSubmit} err={err} />}
        {expandedEditProfilePic && <ShowEditProfilePicture profileCard={profileCard} handleEditProfilePictureTogge={handleEditProfilePictureToggle} handleEditProfilePicSubmit={handleEditProfilePicSubmit} err={err}/>}
        {err && <ErrorMessage/>}
      </div>
      
    </div>
  );
}
