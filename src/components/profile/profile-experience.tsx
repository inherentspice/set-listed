import React, { useState } from "react";
import ReactDOM from "react-dom";
import Edit from "../../media/icons/edit.png";
import Add from "../../media/icons/add.png";
import "../../styles/profile-experience.css";
import { FakeUserData } from "../../dummy-data/fake-users";
import convertDateRange from "../../utilities/convert-date-range";
import { useParams } from "react-router-dom";
import CancelButton from "../../media/icons/cancel.png";


export default function ProfileExperience(){
    const [expandedAddExperience, setExpandedAddExperience] = useState<null | number>(null);
    const [expandedEditExperience, setExpandedEditExperience] = useState<null | number>(null);
    const [experienceIndex, setExperienceIndex] = useState(-1);

    const { username } = useParams();
    const userIndex = FakeUserData.findIndex(x => x.username === username);

    function handleAddExperienceClick(id: number): void{
        setExpandedAddExperience(id);
    }
    function handleEditExperienceClick(id: number, index: number): void{
        setExpandedEditExperience(id);
        setExperienceIndex(index);
        console.log("click");
    }

    function handleAddExerienceClose(): void{
        setExpandedAddExperience(null);
    }
    function handleEditExerienceClose(): void{
        setExpandedEditExperience(null);
    }

    function ShowAddExperience() {
        return ReactDOM.createPortal(
          <>
            <div className="expanded-profile-overlay-cont" key={FakeUserData[userIndex].id}></div>
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
        return ReactDOM.createPortal(
          <>
            <div className="expanded-profile-overlay-cont" key={FakeUserData[userIndex].id}></div>
            <div className="expanded-profile-overlay">
                <div className="expanded-profile-overlay-header-cont">
                    <h2 className="expanded-profile-overlay-title">Edit Your Experience</h2>
                    <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditExerienceClose()} />
                </div>
                <form className="add-experience-form">
                <div className="add-experience-form-item">
                    <label>Title:</label>
                    <input defaultValue={FakeUserData[userIndex].experience[experienceIndex].title}></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Venue:</label>
                    <input defaultValue={FakeUserData[userIndex].experience[experienceIndex].venue}></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Start:</label>
                    <input type="date"></input>
                </div>
                <div className="add-experience-form-item">
                    <label>End:</label>
                    <input type="date"/>
                    
                </div>
                <div className="add-experience-form-item">
                    <label>Location:</label>
                    <input defaultValue={FakeUserData[userIndex].experience[experienceIndex].location}></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Description:</label>
                    <input defaultValue={FakeUserData[userIndex].experience[experienceIndex].description } maxLength={2000}></input>
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
                    <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddExperienceClick(FakeUserData[userIndex].id)} />
                </div>
            </div>
            <div className="profile-experience-items-cont">
                {FakeUserData[userIndex].experience.map(item => {
                    return(
                        <div className="profile-experience-item">
                            <img className="profile-experience-item-img" src={item.img} />
                            <div className="profile-experience-item-info-cont">
                                <div className="profile-experience-item-head">
                                    <div className="profile-experience-head-left">
                                        <div className="profile-experience-item-title">{item.title}</div>
                                        <div className="profile-experience-item-venue">{item.venue}</div>
                                    </div>
                                    <div className="profile-experience-item-head-right">
                                        <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditExperienceClick(FakeUserData[userIndex].id, FakeUserData[userIndex].experience.indexOf(item))} />
                                    </div>
                                </div>                                    
                                <div className="profile-experience-item-duration-cont">
                                    <div className="profile-experience-item-dates">{item.start.toString().slice(4,16) +" - "+ (item.end.toString().slice(4,16) === new Date(Date.now()).toString().slice(4,16) ? "Present" : item.end.toString().slice(4,16))}</div>
                                    <div>|</div>
                                    <div className="profile-experience-item-duration">{convertDateRange(item.start, item.end)}</div>
                                </div>
                                <div className="profile-experience-item-location">{item.location}</div>
                                <div className="profile-experience-item-description">{item.description}</div>
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
