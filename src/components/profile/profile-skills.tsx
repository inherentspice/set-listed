import React, {useState} from "react";
import ReactDOM from "react-dom";
import { SkillData } from "../../types/profile";
import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import CancelButton from "../../media/icons/cancel.png";

export default function ProfileSkills(props: {skills: SkillData[]}) {

  const [expandedAddSkill, setExpandedAddSkill] = useState<boolean>(false);
  const [expandedEditSkill, setExpandedEditSkill] = useState<boolean>(false);

  function handleAddSkillClick(): void{
    setExpandedAddSkill(true);
  }
  function handleEditSkillClick(): void{
    setExpandedEditSkill(true);
  }

  function handleAddSkillClose(): void{
    setExpandedAddSkill(false);
  }

  function handleEditSkillClose(): void{
    setExpandedEditSkill(false);
  }

  function ShowAddSkill() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleAddSkillClose()} ></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Add to Your Skill Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleAddSkillClose()} />
          </div>
        </div>
      </>,
      document.body
    );
  }

  function ShowEditSkill() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleEditSkillClose()} ></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Edit Your Skill Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditSkillClose()} />
          </div>
        </div>
      </>,
      document.body
    );
  }

  return (
    <div className="profile-cont comp">
      <div className="editable-comp-header">
        <h2>Skills</h2>
        <div className="profile-experience-header-buttons">
          <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddSkillClick()} />
          <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditSkillClick()}/>
        </div>
      </div>
      <div className="skills-cont">
        {props.skills.map((skill) => {
          return (
            <div className="skill-cont">
              <div className="content-endorse-cont">
                <p>{skill.content}</p>
                <button className="primary-button">Endorse</button>
              </div>
              {skill.endorsments && <p>{skill.endorsments + " endorsements"}</p>}
            </div>
          );
        })}
      </div>
      {expandedAddSkill && <ShowAddSkill />}
      {expandedEditSkill && <ShowEditSkill />}
    </div>
  );
}
