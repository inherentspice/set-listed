import React, { useEffect, useState } from "react";
import "../../../styles/profiles/profile-about.css";
import { AboutData } from "../../../types/profile";
import ShowEditAbout from "./Show-Edit-About";


export default function ProfileAbout(props: {about: AboutData[], userProfile: boolean}) {
  const [expandedEditAbout, setExpandedEditAbout] = useState<boolean>(false);
  const [about, setAbout] = useState<AboutData>(props.about[0]);
  const [err, setErr] = useState<boolean>(false);


  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);

  function handleExpandEditAboutToggle(): void{
    setExpandedEditAbout(!expandedEditAbout);
  }

  return(
    <div className="profile-about-cont comp">

      <div className="profile-about-title-cont">
        <h2 className="profile-about-title">About</h2>
        {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleExpandEditAboutToggle()}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" /></svg>}
      </div>

      <div className="profile-about-text-cont">
        {about.content.length <=0 ? <p>Add a short bio about yourself by clicking the edit bio button above!</p> : <p className="profile-about-text">{about.content}</p> }
        {expandedEditAbout && <ShowEditAbout about={about} setAbout={setAbout} err={err} handleExpandEditAboutToggle={handleExpandEditAboutToggle} setErr={setErr}/>}
      </div>
      
    </div>
  );
}
