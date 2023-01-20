import React from "react";
import Edit from "../../media/icons/edit.png";
import Add from "../../media/icons/add.png";
import "../../styles/profile-experience.css";
import OpenMic from "../../media/profile/openmic.png";

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
                <div className="profile-experience-item">
                    <img className="profile-experience-item-img" src={OpenMic} />
                    <div className="profile-experience-item-info-cont">
                        <div className="profile-experience-item-title">Improv Host</div>
                        <div className="profile-experience-item-venue">Danny's Dive and Beer Shack</div>
                        <div className="profile-experience-item-duration-cont">
                            <div className="profile-experience-item-dates">Jan 7, 1989 - Present</div>
                            <div>|</div>
                            <div className="profile-experience-item-duration">24 Years</div>
                        </div>
                        <div className="profile-experience-item-location">Bangkok, Thailand</div>
                        <div className="profile-experience-item-description">I run a show every night.</div>
                    </div>
                </div>
            </div>
            <div className="profile-experience-show-all-experience">
                Show all experience
            </div>
        </div>
    );
}
