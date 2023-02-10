import React, { useState } from "react";
import ReactDOM from "react-dom";
import Edit from "../../media/icons/edit.png";
import Add from "../../media/icons/add.png";
import "../../styles/profile-experience.css";
import convertDateRange from "../../utilities/convert-date-range";
import CancelButton from "../../media/icons/cancel.png";
import { ExperienceData } from "../../types/profile";



export default function ProfileExperience(props: {experience: ExperienceData[]}){
    const [expandedAddExperience, setExpandedAddExperience] = useState<boolean>(false);
    const [expandedEditExperience, setExpandedEditExperience] = useState<null | string>(null);

    function handleAddExperienceClick(): void{
        setExpandedAddExperience(true);
    }
    function handleEditExperienceClick(id: string): void{
        setExpandedEditExperience(id);
    }

    function handleAddExerienceClose(): void{
        setExpandedAddExperience(false);
    }
    function handleEditExerienceClose(): void{
        setExpandedEditExperience(null);
    }

    function ShowAddExperience() {
        return ReactDOM.createPortal(
          <>
            <div className="expanded-profile-overlay-cont" onClick={() => handleAddExerienceClose()}></div>
            <div className="expanded-profile-overlay">
                <div className="expanded-profile-overlay-header-cont">
                    <h2 className="expanded-profile-overlay-title">Add Your Experience</h2>
                    <img className="start-post-cancel" src={CancelButton} onClick={() => handleAddExerienceClose()} />
                </div>
                <form className="add-experience-form">
                <div className="add-experience-form-item">
                    <label>Title:</label>
                    <input placeholder="Ex: Open Mic Host"></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Venue:</label>
                    <input placeholder="Ex: Tai Chi Comedy"></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Start:</label>
                    <input placeholder="DD/MM/YYYY" type="date"></input>
                </div>
                <div className="add-experience-form-item">
                    <label>End:</label>
                    <input placeholder="DD/MM/YYYY - leave blank if you still perform here" type="date"/>

                </div>
                <div className="add-experience-form-item">
                    <label>Location:</label>
                    <input placeholder="City, Country"></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Description:</label>
                    <input placeholder="Ex: I host a monthly Drag Show Brunch." maxLength={2000}></input>
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

    function ShowEditExperience() {
      const expExperience = props.experience.filter(exp => exp.id === expandedEditExperience)[0];
        return ReactDOM.createPortal(
          <>
            <div className="expanded-profile-overlay-cont" key={expExperience.id} onClick={() => handleEditExerienceClose()}></div>
            <div className="expanded-profile-overlay">
                <div className="expanded-profile-overlay-header-cont">
                    <h2 className="expanded-profile-overlay-title">Edit Your Experience</h2>
                    <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditExerienceClose()} />
                </div>
                <form className="add-experience-form">
                {/* <div className="add-experience-form-item">
                    <label>Title:</label>
                    <input defaultValue={FakeUserData[userIndex].experience[experienceIndex].title}></input>
                </div> */}
                <div className="add-experience-form-item">
                    <label>Venue:</label>
                    <input defaultValue={expExperience.venue}></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Start:</label>
                    <input type="date"></input>
                </div>
                <div className="add-experience-form-item">
                    <label>End:</label>
                    <input type="date"/>

                </div>
                {/* <div className="add-experience-form-item">
                    <label>Location:</label>
                    <input defaultValue={FakeUserData[userIndex].experience[experienceIndex].location}></input>
                </div> */}
                <div className="add-experience-form-item">
                    <label>Description:</label>
                    <input defaultValue={expExperience.content} maxLength={2000}></input>
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
        <div className="profile-experience-cont comp">
            <div className="profile-experience-header">
                <div className="profile-experience-header-title">Experience</div>
                <div className="profile-experience-header-buttons">
                    <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddExperienceClick()} />
                </div>
            </div>
            <div className="profile-experience-items-cont">
                {props.experience.map(item => {
                    return(
                        <div className="profile-experience-item">
                            <img className="profile-experience-item-img" src={"/"} />
                            <div className="profile-experience-item-info-cont">
                                <div className="profile-experience-item-head">
                                    <div className="profile-experience-head-left">
                                        {/* <div className="profile-experience-item-title">{item.title}</div> */}
                                        <div className="profile-experience-item-venue">{item.venue}</div>
                                    </div>
                                    <div className="profile-experience-item-head-right">
                                        <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditExperienceClick(item.id)} />
                                    </div>
                                </div>
                                <div className="profile-experience-item-duration-cont">
                                    {/* <div className="profile-experience-item-dates">{item.start.toString().slice(4,16) +" - "+ (item.end.toString().slice(4,16) === new Date(Date.now()).toString().slice(4,16) ? "Present" : item.end.toString().slice(4,16))}</div> */}
                                    {/* <div>|</div> */}
                                    {/* <div className="profile-experience-item-duration">{convertDateRange(item.start, item.end)}</div> */}
                                </div>
                                {/* <div className="profile-experience-item-location">{item.venue}</div> */}
                                <div className="profile-experience-item-description">{item.content}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="profile-experience-show-all-experience">
                Show all experience
            </div>
            {expandedAddExperience && <ShowAddExperience />}
            {expandedEditExperience && <ShowEditExperience />}
        </div>
    );
}
