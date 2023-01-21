import React from "react";
import Edit from "../../media/icons/edit.png";
import Add from "../../media/icons/add.png";
import "../../styles/profile-experience.css";
import { FakeUserData } from "../../dummy-data/fake-users";
import convertDateRange from "../../utilities/convert-date-range";

export default function ProfileExperience(){
    return(
        <div className="profile-experience-cont comp">
            <div className="profile-experience-header">
                <div className="profile-experience-header-title">Experience</div>
                <div className="profile-experience-header-buttons">
                    <img className="profile-experience-header-btn" src={Add} />
                    <img className="profile-experience-header-btn" src={Edit} />
                </div>
            </div>
            <div className="profile-experience-items-cont">
                {FakeUserData.experience.map(item => {
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
        </div>
    );
}
