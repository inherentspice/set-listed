import React, {useState} from "react";
import ReactDOM from "react-dom";
import ErrorMessage from "../../error-message";
import { IconContext } from "react-icons";
import { SiTwitter, SiYoutube, SiInstagram, SiTiktok } from "react-icons/si";
import HandleEditHeroInformationSubmit from "./Handle-Edit-Hero-Information-Submit";

export default function ShowEditProfileHeroInformation(
    profileCard: any,
    handleEditProfileToggle: any,
    err: any,
    setProfileCard: any,
    setErr: any,

) {
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
                  onClick={(e) => HandleEditHeroInformationSubmit(e, firstName, lastName, country, city, socials, tagline, profileCard, setProfileCard, handleEditProfileToggle, setErr)}
                >Save</button>
            </div>
          </form>
          {err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }
