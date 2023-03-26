import { Dispatch, SetStateAction, useState } from "react";
import ReactDOM from "react-dom";
import ErrorMessage from "../../error-message";
import handleAddSkillSubmit from "./handle-add-skill-submit";
import { SkillData } from "../../../types/profile";

export default function ShowAddSkill(props:{
    handleAddSkillToggle:() => void,
    err: boolean,
    user: string,
    skills: SkillData[],
    setSkills: Dispatch<SetStateAction<SkillData[]>>,
    setErr: Dispatch<SetStateAction<boolean>>,

}) {
    const [content, setContent] = useState<string>("");

    function handleContentChange(value: string): void{
      setContent(value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => props.handleAddSkillToggle()} ></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Add to Your Skill Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => props.handleAddSkillToggle()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <form className="expanded-profile-overlay-form">
            <label className="add-skill-form-item">
              <select id="add-skill-select" value={content} onChange={(e) => handleContentChange(e.target.value)}>
                <option value="">Choose a skill to add</option>
                <option value="Hosting">Hosting</option>
                <option value="Headlining">Headlining</option>
                <option value="Show Running">Show Running</option>
                <option value="Promoting">Promoting</option>
                <option value="Improvisation">Improvisation</option>
                <option value="Crowdwork">Crowdwork</option>
                <option value="Story-telling">Story-telling</option>
                <option value="Writing">Writing</option>
                <option value="Riffing">Riffing</option>
                <option value="One-liners">One-liners</option>
                <option value="Stage Presence">Stage Presence</option>
              </select>
            </label>
            <div className="expanded-profile-overlay-submit">
                    <button
                      className="secondary-button"
                      type="submit"
                      onClick={(e) => handleAddSkillSubmit(e, content, props.user, props.skills, props.setSkills, props.handleAddSkillToggle, props.setErr)}
                    >Save</button>
            </div>
          </form>
          {props.err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }
