import React, { useEffect, useState } from "react";
// import "../../../styles/profiles/profile-experience.css";
import convertDateRange from "../../../utilities/convert-date-range";
import { ExperienceData } from "../../../types/profile";
import ShowImage from "../../../media/profile/openmic.png";
import ShowAddExperience from "./show-add-experience";
import ShowEditExperience from "./show-edit-experience";


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
        {expandedEditExperience && <ShowEditExperience experience={experience} setExperience={setExperience} expandedEditExperience={expandedEditExperience} handleEditExperienceClose={handleEditExperienceClose} user={props.user} err={err} setErr={setErr}/>}
      </div>
    );
}
