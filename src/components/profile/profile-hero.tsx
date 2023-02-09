import React, {useState} from "react";
import ReactDOM from "react-dom";
import RachelLoo from "../../media/home/rachel-profile-picture.png";
import DeniseFerguson from "../../media/home/denise-profile-picture.png";
import "../../styles/profile-hero.css";
import Edit from "../../media/icons/edit.png";
import CancelButton from "../../media/icons/cancel.png";
import { ProfileCardData } from "../../types/profile";

export default function ProfileHero(props: {profileCard: ProfileCardData[]}) {
  const [expandedEditProfile, setExpandedEditProfile] = useState<null | string>(null);

  const profileCard = props.profileCard[0];

  function handleEditProfileClick(id: string): void{
    setExpandedEditProfile(id);
  }

  function handleEditProfileClose(): void{
    setExpandedEditProfile(null);
  }

  function ShowEditProfileHero() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={profileCard.id} onClick={() => handleEditProfileClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="edit-profile-hero-title">Edit Intro</h2>
            <img className="edit-profile-hero-cancel" src={CancelButton} onClick={() => handleEditProfileClose()} />
          </div>
          <form className="edit-profile-hero-form">
            <div>Basic Info</div>
            <div className="edit-profile-hero-form-item">
              <label>First Name</label>
              <input defaultValue={profileCard.firstName}></input>
            </div>

            <div className="edit-profile-hero-form-item">
              <label>Last Name</label>
              <input defaultValue={profileCard.lastName}></input>
            </div>

            <div className="edit-profile-hero-form-item">
              <label>Stagename</label>
              <input></input>
            </div>

            <div className="edit-profile-hero-form-item">
              <label>Category</label>
              <select>
                <option value="comedy">Comedy</option>
                <option value="comedy">Comedy</option>
              </select>
            </div>
            <div className="edit-profile-hero-form-item">
              <label>Type</label>
              <select>
                <option value="standup">Stand Up Comedian</option>
                <option value="improv">Improv Comedian</option>
                <option value="musical">Musical Comedian</option>
                <option value="puppet">Puppet Comedian</option>
                <option value="crosstalk">Cross Talk Comedian</option>
                <option value="host">Host</option>
              </select>
            </div>

            <div className="edit-profile-hero-form-item">
              <label>Tagline</label>
              <input defaultValue={profileCard.tagline} maxLength={50}></input>
            </div>
            <div className="edit-profile-hero-form-item">
              <label>City</label>
              <input defaultValue={profileCard.city}></input>
            </div>
            <div className="edit-profile-hero-form-item">
              <label>Country</label>
              <input defaultValue={profileCard.country}></input>
            </div>

            <div>Social Media</div>

            <div className="edit-profile-hero-form-item">
              <label>Instagram</label>
              <input ></input>
            </div>
            <div className="edit-profile-hero-form-item">
              <label>Youtube</label>
              <input ></input>
            </div>
            <div className="edit-profile-hero-form-item">
              <label>Tik Tok</label>
              <input ></input>
            </div>
            <div className="edit-profile-hero-form-item">
              <label>Twitter</label>
              <input ></input>
            </div>
            <div className="expanded-profile-overlay-submit">
                <button className="expanded-profile-overlay-submit-btn" type="submit">Save</button>
            </div>
          </form>
        </div>
      </>,
      document.body
    );
  }

  return(
    <div className="profile-hero-cont comp">
      <img className="profile-hero-background-edit" src={Edit} />
      <img className="profile-hero-background-img" src={profileCard.backgroundImage || "https://res.cloudinary.com/dhptcrsjc/image/upload/v1675955714/Set-Listed/default-background_wyziyb.png"} alt=""/>
      <img className="profile-hero-profile-img profile-picture-large" src={profileCard.image} alt="" />
      <img className="profile-hero-user-info-edit" src={Edit} onClick={() => handleEditProfileClick(profileCard.id)} />
      <div className="profile-hero-user-cont">
        <div className="profile-hero-user-info-cont">
          <div className="profile-hero-user-name-cont">
            <div className="profile-hero-user-name">{profileCard.firstName+" "+ profileCard.lastName}</div>
            <div className="profile-hero-divide"></div>
          </div>
          <div className='profile-hero-tagline'>{profileCard.tagline}</div>
          <div className='profile-hero-contact-cont'>
            <div className='profile-hero-location'>{profileCard.city+", "+profileCard.country}</div>
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
            {profileCard.socials && profileCard.socials.map(item => {
              return (
                // <div className="profile-hero-user-digital-footprint-item" key={item.id} >
                //   <img className="profile-hero-user-digital-footprint-img" src={item.img} alt=""/>
                //   <div className="profile-hero-user-digital-footprint-username">{item.username}</div>
                //   <img className="profile-her-user-digital-footprint-follower-img" src={Follower} alt="" />
                //   <div className="profile-hero-user-digital-footprint-followers">{item.followers}</div>
                // </div>
                <h1>{item}</h1>
              );
            })}
          </div>
        </div>
      </div>
      {expandedEditProfile && <ShowEditProfileHero />}
    </div>
  );
}
