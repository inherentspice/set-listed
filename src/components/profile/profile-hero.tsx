import React, {useState} from "react";
import ReactDOM from "react-dom";
import RachelLoo from "../../media/home/rachel-profile-picture.png";
import DeniseFerguson from "../../media/home/denise-profile-picture.png";
import "../../styles/profile-hero.css";
import Edit from "../../media/icons/edit.png";
import CancelButton from "../../media/icons/cancel.png";
import { ProfileCardData } from "../../types/profile";
import ProfileService from "../../services/home/profile";

export default function ProfileHero(props: {profileCard: ProfileCardData[]}) {
  const [expandedEditProfile, setExpandedEditProfile] = useState<string>("");
  const [expandedEditBackground, setExpandedEditBackground] = useState<string>("");
  const [expandedEditProfilePic, setExpandedEditProfilePic] = useState<string>("");

  const profileCard = props.profileCard[0];

  function handleEditProfileClick(id: string): void{
    setExpandedEditProfile(id);
  }

  function handleEditProfileClose(): void{
    setExpandedEditProfile("");
  }

  function handleEditBackgroundClick(id: string): void{
    setExpandedEditBackground(id);
  }

  function handleEditBackgroundClose(): void{
    setExpandedEditBackground("");
  }

  function handleEditProfilePicClick(id: string): void{
    setExpandedEditProfilePic(id);
  }

  function handleEditProfilePicClose(): void{
    setExpandedEditProfilePic("");
  }

  function handleEditBackgroundSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUpload: File | null) {
    e.preventDefault();
    addBackground(imageUpload, profileCard.user)
      .then(() => {
        console.log("new background added");
      }).catch((err) => {
        console.log(err);
      });
  }

  async function addBackground(imageUpload: File | null, user: string) {
    if (!imageUpload) {
      console.log("missing image file");
      return;
    }
    const formData = new FormData();
    formData.append("image", imageUpload);
    try {
      const newImage = await ProfileService.editBackground(formData, user);
      console.log(newImage);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEditHeroSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    socials: string[],
    tagline: string
    ) {
      e.preventDefault();
      addHeroEdit(firstName, lastName, country, city, socials, tagline, profileCard.user)
        .then(() => {
          console.log("hero edited");
        }).catch((err) => {
          console.log(err);
        });
    }

  async function addHeroEdit(
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    socials: string[],
    tagline: string,
    user: string
  ) {
    const formData = {
      firstName,
      lastName,
      country,
      city,
      socials,
      tagline,
    };
    try {
      const editedHero = await ProfileService.editHero(formData, user);
      console.log(editedHero);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEditProfilePicSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUpload: File | null
  ) {
    e.preventDefault();
    addProfilePicEdit(imageUpload, profileCard.user)
      .then(() => {
        console.log("profile pic changed");
      }).catch((err) => {
        console.log(err);
      });
  }

  async function addProfilePicEdit(imageUpload: File | null, user: string) {
    if (!imageUpload) {
      console.log("missing image file");
      return;
    }
    const formData = new FormData();
    formData.append("image", imageUpload);
    try {
      const newImage = await ProfileService.editProfilePic(formData, user);
      console.log(newImage);
    } catch (err) {
      console.log(err);
    }
  }

  function ShowEditBackgroundHero() {
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void{
      if (e.target.files){
        setImageUpload(e.target.files[0]);
      }
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={profileCard.id} onClick={() => handleEditBackgroundClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="edit-profile-hero-title">Edit Background Image</h2>
            <img className="edit-profile-hero-cancel" src={CancelButton} onClick={() => handleEditBackgroundClose()} />
          </div>
          <div className="edit-profile-hero-background">
            {imageUpload ? (
              <img src={URL.createObjectURL(imageUpload)} alt="" />
            ) : (
              <img src={profileCard.backgroundImage || "https://res.cloudinary.com/dhptcrsjc/image/upload/v1675955714/Set-Listed/default-background_wyziyb.png"} alt=""></img>
            )}
            <form className="edit-profile-hero-form">
              <label className="profile-add-label">
                <input className="upload-image-input" type="file" onChange={handleImageChange}></input>
              </label>
            </form>
          </div>
          <button className="primary-button" type="submit" onClick={(e)=>handleEditBackgroundSubmit(e, imageUpload)}>Save New Background</button>
        </div>
      </>,
      document.body
    );
  }

  function ShowEditProfilePic() {
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void{
      if (e.target.files){
        setImageUpload(e.target.files[0]);
      }
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={profileCard.id} onClick={() => handleEditProfilePicClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="edit-profile-hero-title">Edit Profile Image</h2>
            <img className="edit-profile-hero-cancel" src={CancelButton} onClick={() => handleEditProfilePicClose()} />
          </div>
          <div className="edit-profile-hero-pic">
            {imageUpload ? (
              <img src={URL.createObjectURL(imageUpload)} alt="" />
            ) : (
              <img src={profileCard.image || "https://res.cloudinary.com/dhptcrsjc/image/upload/v1674789718/Set-Listed/empty-profile-pic_b2hrxu.png"} alt=""></img>
            )}
            <form className="edit-profile-hero-form">
              <label className="profile-add-label">
                <input className="upload-image-input" type="file" onChange={handleImageChange}></input>
              </label>
            </form>
          </div>
          <button className="primary-button" type="submit" onClick={(e)=>handleEditProfilePicSubmit(e, imageUpload)}>Save New Profile Pic</button>
        </div>
      </>,
      document.body
    );
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
        <div className="expanded-profile-overlay-cont" key={profileCard.id} onClick={() => handleEditProfileClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="edit-profile-hero-title">Edit Intro</h2>
            <img className="edit-profile-hero-cancel" src={CancelButton} onClick={() => handleEditProfileClose()} />
          </div>
          <form className="edit-profile-hero-form">
            <label className="edit-profile-hero-form-item">First Name
              <input type="text" value={firstName} onChange={handleFirstNameChange}></input>
            </label>

            <label className="edit-profile-hero-form-item">Last Name
              <input type="text" value={lastName} onChange={handleLastNameChange}></input>
            </label>

            <label className="edit-profile-hero-form-item">Tagline
              <input type="text" value={tagline} onChange={handleTaglineChange} maxLength={50}></input>
            </label>

            <label className="edit-profile-hero-form-item">City
              <input type="text" value={city} onChange={handleCityChange}></input>
            </label>

            <label className="edit-profile-hero-form-item">Country
              <input type="text" value={country} onChange={handleCountryChange}></input>
            </label>

            <div>Social Media</div>
            <label className="edit-profile-hero-form-item">Instagram
              <input type="text" value={socials[0] ? socials[0] : ""} onChange={(e) => handleSocialsChange(e, 0)}></input>
            </label>

            <label className="edit-profile-hero-form-item">Youtube
              <input type="text" value={socials[1] ? socials[1] : ""} onChange={(e) => handleSocialsChange(e, 1)}></input>
            </label>

            <label className="edit-profile-hero-form-item">Tik Tok
              <input type="text" value={socials[2] ? socials[2] : ""} onChange={(e) => handleSocialsChange(e, 2)}></input>
            </label>

            <label className="edit-profile-hero-form-item">Twitter
              <input type="text" value={socials[3] ? socials[3] : ""} onChange={(e) => handleSocialsChange(e, 3)}></input>
            </label>

            <div className="expanded-profile-overlay-submit">
                <button
                  className="expanded-profile-overlay-submit-btn"
                  type="submit"
                  onClick={(e) => handleEditHeroSubmit(e, firstName, lastName, country, city, socials, tagline)}
                >Save</button>
            </div>
          </form>
        </div>
      </>,
      document.body
    );
  }

  return (
    <div className="profile-hero-cont comp">
      <img className="profile-hero-background-edit" src={Edit} onClick={() => handleEditBackgroundClick(profileCard.id)}/>
      <img className="profile-hero-background-img"
        src={profileCard.backgroundImage || "https://res.cloudinary.com/dhptcrsjc/image/upload/v1675955714/Set-Listed/default-background_wyziyb.png"}
        alt=""
      />
      <img
        className="profile-hero-profile-img profile-picture-large"
        src={profileCard.image}
        alt=""
        onClick={() => handleEditProfilePicClick(profileCard.id)}
      />
      <img className="profile-hero-user-info-edit" src={Edit} onClick={() => handleEditProfileClick(profileCard.id)} />
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
                <p>{item}</p>
              );
            })}
          </div>
        </div>
      </div>
      {expandedEditProfile && <ShowEditProfileHero />}
      {expandedEditBackground && <ShowEditBackgroundHero />}
      {expandedEditProfilePic && <ShowEditProfilePic />}
    </div>
  );
}
