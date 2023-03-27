import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../../../styles/profiles/profile-experience.css";
import convertDateRange from "../../../utilities/convert-date-range";
import { ExperienceData } from "../../../types/profile";
import ShowImage from "../../../media/profile/openmic.png";
import ErrorMessage from "../../error-message";
import addExperienceEdit from "./edit-experience";
import deleteExperience from "./delete-experience";
import ShowAddExperience from "./show-add-experience";


export default function ProfileExperience(props: {experience: ExperienceData[], user: string, userProfile: boolean}){
    const [expandedAddExperience, setExpandedAddExperience] = useState<boolean>(false);
    const [expandedEditExperience, setExpandedEditExperience] = useState<string>("");
    const [err, setErr] = useState<boolean>(false);
    const [experience, setExperience] = useState<ExperienceData[]>(props.experience);

    useEffect(() => {
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }, [err]);

    function handleAddExperienceClick(): void{
        setExpandedAddExperience(true);
    }
    function handleEditExperienceClick(id: string): void{
        setExpandedEditExperience(id);
    }

    function handleAddExperienceClose(): void{
        setExpandedAddExperience(false);
    }
    function handleEditExperienceClose(): void{
        setExpandedEditExperience("");
    }

    function ShowEditExperience() {
      const expExperience = props.experience.filter(exp => exp.id === expandedEditExperience)[0];
      const [title, setTitle] = useState<string>(expExperience.title);
      const [description, setDescription] = useState<string>(expExperience.content);
      const [venue, setVenue] = useState<string>(expExperience.venue);
      const [dateStart, setDateStart] = useState<string>(expExperience.dateStart ? expExperience.dateStart.slice(0, 10) : "");
      const [dateEnd, setDateEnd] = useState<string>(expExperience.dateEnd ? expExperience.dateEnd.slice(0, 10) : "");
      const [location, setLocation] = useState<string>(expExperience.location ? expExperience.location : "");

      function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void{
        setTitle(e.target.value);
      }

      function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>): void{
        setDescription(e.target.value);
      }

      function handleVenueChange(e: React.ChangeEvent<HTMLInputElement>): void{
        setVenue(e.target.value);
      }

      function handleDateStartChange(e: React.ChangeEvent<HTMLInputElement>): void{
        setDateStart(e.target.value);
      }

      function handleDateEndChange(e: React.ChangeEvent<HTMLInputElement>): void{
        setDateEnd(e.target.value);
      }

      function handleLocationChange(e: React.ChangeEvent<HTMLInputElement>): void{
        setLocation(e.target.value);
      }

      return ReactDOM.createPortal(
        <>
          <div className="expanded-profile-overlay-cont" key={expExperience.id} onClick={() => handleEditExperienceClose()}></div>
          <div className="expanded-profile-overlay">
            <div className="expanded-profile-overlay-header-cont">
              <h2 className="expanded-profile-overlay-header-title">Edit Your Experience</h2>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleEditExperienceClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
            </div>
            <form className="expanded-profile-overlay-form">
              <label className="expanded-profile-overlay-form-item">Title:
                <input value={title} onChange={handleTitleChange}></input>
              </label>
              <label className="expanded-profile-overlay-form-item">Venue:
                <input value={venue} onChange={handleVenueChange}></input>
              </label>
              <label className="expanded-profile-overlay-form-item">Start:
                <input type="date" value={dateStart} onChange={handleDateStartChange}></input>
              </label>
              <label className="expanded-profile-overlay-form-item">End:
                <input type="date" value={dateEnd} onChange={handleDateEndChange}/>
              </label>
              <label className="expanded-profile-overlay-form-item">Location:
                <input value={location} onChange={handleLocationChange}></input>
              </label>
              <label className="expanded-profile-overlay-form-item">Description:
                <input value={description} maxLength={2000} onChange={handleDescriptionChange}></input>
              </label>
              <div className="expanded-profile-overlay-submit">
                <button
                  className="secondary-button"
                  type="submit"
                  onClick={(e) => addExperienceEdit(e, title, venue, description, dateStart, dateEnd, location, expExperience.id, props.user, experience, setExperience, handleEditExperienceClose, setErr)}
                >Save</button>
                <button
                  className="secondary-button"
                  onClick={(e) => deleteExperience(e, expExperience.id, experience, setExperience, handleEditExperienceClose, setErr)}
                >Delete</button>
              </div>
            </form>
            {err && <ErrorMessage/>}
          </div>
        </>,
      document.body
    );
  }
    return (
      <div className="profile-experience-cont comp">
        <div className="profile-section-header">
          <div className="profile-experience-header-title">Experience</div>
          <div className="profile-experience-header-buttons">
            {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleAddExperienceClick()}><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>}
          </div>
        </div>
        <div className="profile-experience-items-cont">
          {experience.length <=0 ? <p>You haven't posted any experience yet.</p> : experience.map(item => {
            return(
              <div className="profile-experience-item">
                <img className="profile-experience-item-img" src={ShowImage} />
                <div className="profile-experience-item-info-cont">
                  <div className="profile-experience-item-head">
                    <div className="profile-experience-head-left">
                      <div className="profile-experience-item-title">{item.title}</div>
                      <div className="profile-experience-item-venue">{item.venue + (item.location == undefined ? "" : " - " + item.location)}</div>
                    </div>
                    {props.userProfile && <div className="profile-experience-item-head-right">
                      <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-body-button" onClick={() => handleEditExperienceClick(item.id)}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
                    </div>}
                  </div>
                  <div className="profile-experience-item-duration-cont">
                    {/* <div className="profile-experience-item-dates">{item.start.toString().slice(4,16) +" - "+ (item.end.toString().slice(4,16) === new Date(Date.now()).toString().slice(4,16) ? "Present" : item.end.toString().slice(4,16))}</div> */}
                      {/* <div>|</div> */}
                      <div className="profile-experience-item-duration">{item.dateStart == undefined? null : item.dateEnd == undefined ? null : convertDateRange(item.dateStart, item.dateEnd)}</div>
                    </div>
                    <div className="profile-experience-item-description">{item.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="profile-experience-show-all-experience">
            Show All Experience
          </div>
        {expandedAddExperience && <ShowAddExperience user={props.user} handleAddExperienceClose={handleAddExperienceClose} experience={experience} setExperience={setExperience} err={err} setErr={setErr} />}
        {expandedEditExperience && <ShowEditExperience />}
      </div>
    );
}
