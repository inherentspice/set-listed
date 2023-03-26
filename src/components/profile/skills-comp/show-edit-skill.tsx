import ReactDOM from "react-dom";
import ErrorMessage from "../../error-message";
import { SkillData } from "../../../types/profile";
import handleDeleteSkillSubmit from "./handle-delete-skill-submit";
import { Dispatch, SetStateAction } from "react";

export default function ShowEditSkill(props:{
    handleEditSkillToggle: () => void,
    skills: SkillData[],
    err: boolean,
    setSkills: Dispatch<SetStateAction<SkillData[]>>,
    setErr: Dispatch<SetStateAction<boolean>>,

}) {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => props.handleEditSkillToggle()} ></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Edit Your Skill Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => props.handleEditSkillToggle()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <div className="edit-skills-cont">
            {props.skills.map(skill => {
            return (
              <div className="edit-skill-cont" key={skill.id}>
                <p>{skill.content}</p>
                <button className="primary-button" onClick={(e) => handleDeleteSkillSubmit(e, skill.id, props.skills, props.setSkills, props.setErr)}>Delete</button>
                {skill.endorsments && <p>{skill.endorsments + " endorsements"}</p>}
              </div>
            );
            })}
          </div>
          {props.err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }
