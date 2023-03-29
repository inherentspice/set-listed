import React, { Dispatch, SetStateAction, useState } from "react";
import ReactDOM from "react-dom";
import { ExperienceData } from "../../../types/profile";
import addExperienceEdit from "./edit-experience";
import deleteExperience from "./delete-experience";
import ErrorMessage from "../../error-message";


export default function ShowEditExperience(props: {
  experience: ExperienceData[],
  setExperience: Dispatch<SetStateAction<ExperienceData[]>>,
  expandedEditExperience: string,
  handleEditExperienceClose: () => void,
  user: string,
  err: boolean,
  setErr: Dispatch<SetStateAction<boolean>>

}) {
  const expExperience = props.experience.filter(exp => exp.id === props.expandedEditExperience)[0];
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
      <div className="expanded-profile-overlay-cont" key={expExperience.id} onClick={() => props.handleEditExperienceClose()}></div>
      <div className="expanded-profile-overlay">
        <div className="expanded-profile-overlay-header-cont">
          <h2 className="expanded-profile-overlay-header-title">Edit Your Experience</h2>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => props.handleEditExperienceClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
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
              onClick={(e) => addExperienceEdit(e, title, venue, description, dateStart, dateEnd, location, expExperience.id, props.user, props.experience, props.setExperience, props.handleEditExperienceClose, props.setErr)}
            >Save</button>
            <button
              className="secondary-button"
              onClick={(e) => deleteExperience(e, expExperience.id, props.experience, props.setExperience, props.handleEditExperienceClose, props.setErr)}
            >Delete</button>
          </div>
        </form>
        {props.err && <ErrorMessage/>}
      </div>
    </>,
  document.body
);
}
