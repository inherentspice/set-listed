import React, { Dispatch, SetStateAction, useState } from "react";
import ReactDOM from "react-dom";
import addExperience from "./add-experience";
import ErrorMessage from "../../error-message";
import { ExperienceData } from "../../../types/profile";


export default function ShowAddExperience(props: {
  user: string,
  handleAddExperienceClose: () => void,
  experience: ExperienceData[],
  setExperience: Dispatch<SetStateAction<ExperienceData[]>>,
  err: boolean,
  setErr: Dispatch<SetStateAction<boolean>>
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [location, setLocation] = useState<string>("");

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
        <div className="expanded-profile-overlay-cont" onClick={() => props.handleAddExperienceClose()}></div>
        <div className="expanded-profile-overlay">
            <div className="expanded-profile-overlay-header-cont">
                <h2 className="expanded-profile-overlay-header-title">Add Your Experience</h2>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => props.handleAddExperienceClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
            </div>
            <form className="expanded-profile-overlay-form">
              <label className="expanded-profile-overlay-form-item">Title:
                <input placeholder="Ex: Open Mic Host" value={title} onChange={handleTitleChange}></input>
              </label>
              <label className="expanded-profile-overlay-form-item">Venue:
                <input placeholder="Ex: Tai Chi Comedy" value={venue} onChange={handleVenueChange}></input>
              </label>
              <label className="expanded-profile-overlay-form-item">Start:
                <input placeholder="DD/MM/YYYY" type="date" value={dateStart} onChange={handleDateStartChange}></input>
              </label>
              <label className="expanded-profile-overlay-form-item">End:
                <input placeholder="DD/MM/YYYY - leave blank if you still perform here" type="date" value={dateEnd} onChange={handleDateEndChange}/>
              </label>
              <label className="expanded-profile-overlay-form-item">Location:
                <input placeholder="City, Country" value={location} onChange={handleLocationChange}></input>
              </label>
              <label className="expanded-profile-overlay-form-item">Description:
                <input placeholder="Ex: I host a monthly Drag Show Brunch." maxLength={2000} value={description} onChange={handleDescriptionChange}></input>
              </label>
            <div className="expanded-profile-overlay-submit">
              <button
                className="secondary-button"
                type="submit"
                onClick={(e) => addExperience(e, title, venue, description, dateStart, dateEnd, location, props.user, props.experience, props.setExperience, props.handleAddExperienceClose, props.setErr)}
              >Save</button>
            </div>
          </form>
          {props.err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
}
