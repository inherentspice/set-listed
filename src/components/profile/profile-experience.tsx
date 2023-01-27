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


    const { username } = useParams();
    const userIndex = FakeUserData.findIndex(x => x.username === username);

    function handleAddExperienceClick(id: number): void{
        setExpandedAddExperience(id);
    }
    function handleEditExperienceClick(id: number): void{
        setExpandedEditExperience(id);
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
                <form>
                <div className="add-experience-form-item">
                    <label>Title:</label>
                    <input></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Venue:</label>
                    <input></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Start:</label>
                    <input></input>
                </div>
                <div className="add-experience-form-item">
                    <label>End:</label>
                    <input/>
                    <label>On-Going</label>
                    <input type="radio"/>
                </div>
                <div className="add-experience-form-item">
                    <label>Location:</label>
                    <input></input>
                </div>
                <div className="add-experience-form-item">
                    <label>Description:</label>
                    <input></input>
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

    function ShowEditExperience() {
        return ReactDOM.createPortal(
          <>
            <div className="expanded-start-post-cont" key={FakeUserData[userIndex].id}></div>
            <div className="expanded-start-post">
                <div className="expanded-profile-overlay-header-cont">
                    <h2 className="expanded-profile-overlay-title">Edit Your Experience</h2>
                    <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditExerienceClose()} />
                </div>
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
                    <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditExperienceClick(FakeUserData[userIndex].id)} />
                </div>
            </div>
            <div className="profile-experience-items-cont">
                {FakeUserData[userIndex].experience.map(item => {
                    return(
                        <div className="profile-experience-item">
                            <img className="profile-experience-item-img" src={item.img} />
                            <div className="profile-experience-item-info-cont">
                                <div className="profile-experience-item-title">{item.title}</div>
                                <div className="profile-experience-item-venue">{item.venue}</div>
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
