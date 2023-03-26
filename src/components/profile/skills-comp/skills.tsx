import React, {useEffect, useState} from "react";
import { SkillData } from "../../../types/profile";
import "../../../styles/profiles/profile-skills.css";
import ShowAddSkill from "./Show-Add-Skill";
import ShowEditSkill from "./show-edit-skill";

export default function ProfileSkills(props: {skills: SkillData[], user: string, userProfile: boolean}) {

  const [expandedAddSkill, setExpandedAddSkill] = useState<boolean>(false);
  const [expandedEditSkill, setExpandedEditSkill] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [skills, setSkills] = useState(props.skills);

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);

  function handleAddSkillToggle(): void{
    setExpandedAddSkill(!expandedAddSkill);
  }
  
  function handleEditSkillToggle(): void{
    setExpandedEditSkill(!expandedEditSkill);
  }

  return (
    <div className="profile-cont comp">
      <div className="profile-section-header">
        <h2 className="skills-header-title">Skills</h2>
        {props.userProfile && <div className="profile-experience-header-buttons">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleAddSkillToggle()} ><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleEditSkillToggle()}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
        </div>}
      </div>
      <div className="skills-cont">
        {skills.length <=0 ? <p>You haven't added any skills yet.</p> : skills.map((skill) => {
          return (
            <div className="skill-cont" key={skill.id}>
              <div className="content-endorse-cont">
                <p>{skill.content}</p>
                <button className="primary-button">Endorse</button>
              </div>
              {skill.endorsments && <p>{skill.endorsments + " endorsements"}</p>}
            </div>
          );
        })}
      </div>
      {expandedAddSkill && <ShowAddSkill handleAddSkillToggle={handleAddSkillToggle} err={err} user={props.user} skills={skills} setSkills={setSkills} setErr={setErr} />}
      {expandedEditSkill && <ShowEditSkill handleEditSkillToggle={handleAddSkillToggle} skills={skills} err={err} setSkills={setSkills} setErr={setErr} />}
    </div>
  );
}
