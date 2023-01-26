import React, {useState} from "react";
import ReactDOM from "react-dom";
import { FakeUserData } from "../../dummy-data/fake-users";
import RachelLoo from "../../media/home/rachel-profile-picture.png";
import DeniseFerguson from "../../media/home/denise-profile-picture.png";
import "../../styles/profile-hero.css";
import Follower from "../../media/icons/follower.png";
import Edit from "../../media/icons/edit.png";
import CancelButton from "../../media/icons/cancel.png";
import { useParams } from "react-router-dom";


export default function ProfileHero() {
  const [expandedEditProfile, setExpandedEditProfile] = useState<null | number>(null);

  const { username } = useParams();
  const userIndex = FakeUserData.findIndex(x => x.username === username);

  function handleEditProfileClick(id: number): void{
    setExpandedEditProfile(id);
  }

  function handleEditProfileClose(): void{
    setExpandedEditProfile(null);
  }

  function ShowEditProfileHero() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-edit-profile-cont" key={FakeUserData[userIndex].id}></div>
        <div className="expanded-edit-profile">
          <div className="edit-profile-hero-header-cont">
            <div className="edit-profile-hero-title">Edit Intro</div>
            <img className="edit-profile-hero-cancel" src={CancelButton} onClick={() => handleEditProfileClose()} />
          </div>
          <form className="edit-profile-hero-form">
            <div>Basic Info</div>
            <div className="edit-profile-hero-form-item">
              <label>First Name</label>
              <input defaultValue={FakeUserData[userIndex].userFirstName}></input>
            </div>

            <div className="edit-profile-hero-form-item">
              <label>Last Name</label>
              <input defaultValue={FakeUserData[userIndex].userLastName}></input>
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
              <input defaultValue={FakeUserData[userIndex].userTagline} maxLength={50}></input>
            </div>
            <div className="edit-profile-hero-form-item">
              <label>City</label>
              <input defaultValue={FakeUserData[userIndex].city}></input>
            </div>
            <div className="edit-profile-hero-form-item">
              <label>Country</label>
              <input defaultValue={FakeUserData[userIndex].country}></input>
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
            <div className="edit-profile-hero-submit">
                <button className="edit-profile-hero-submit-btn" type="submit">Save</button>
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
      <img className="profile-hero-background-img" src={FakeUserData[userIndex].userBackgroundPicture} alt=""/>
      <img className="profile-hero-profile-img profile-picture-large" src={FakeUserData[userIndex].userProfilePicture} alt="" />
      <img className="profile-hero-user-info-edit" src={Edit} onClick={() => handleEditProfileClick(FakeUserData[userIndex].id)} />
      <div className="profile-hero-user-cont">
        <div className="profile-hero-user-info-cont">
          <div className="profile-hero-user-name-cont">
            <div className="profile-hero-user-name">{FakeUserData[userIndex].userFirstName+" "+ FakeUserData[userIndex].userLastName}</div>
            <div className="profile-hero-divide"></div>
            <div className='profile-hero-performer-type'>{FakeUserData[userIndex].subCategory}</div>

          </div>
          <div className='profile-hero-tagline'>{FakeUserData[userIndex].userTagline}</div>
          <div className='profile-hero-contact-cont'>
            <div className='profile-hero-location'>{FakeUserData[userIndex].city+", "+FakeUserData[userIndex].country}</div>
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
            {FakeUserData[userIndex].socialMedia.map(item => {
              return (
                <div className="profile-hero-user-digital-footprint-item" key={item.id} >
                  <img className="profile-hero-user-digital-footprint-img" src={item.img} alt=""/>
                  <div className="profile-hero-user-digital-footprint-username">{item.username}</div>
                  <img className="profile-her-user-digital-footprint-follower-img" src={Follower} alt="" />
                  <div className="profile-hero-user-digital-footprint-followers">{item.followers}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {expandedEditProfile && <ShowEditProfileHero />}
    </div>
  );
}
