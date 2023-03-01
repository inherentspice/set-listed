import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { SkillData } from "../../types/profile";
import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import CancelButton from "../../media/icons/cancel.png";
import ProfileService from "../../services/home/profile";
import ErrorMessage from "../error-message";
import "../../styles/profiles/profile-skills.css";

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

  function handleAddSkillSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string
  ) {
    e.preventDefault();
    addSkill(content, props.user)
      .then(() => {
        console.log("added skill");
      });
  }

  async function addSkill(content: string, user: string) {
    const formData = {
      content,
      user
    };
    try {
      const newSkill = await ProfileService.postSkill(formData);
      const newSkills = skills;
      newSkills.push(newSkill.data.skill);
      setSkills(newSkills);
      handleAddSkillClose();
    } catch (err) {
      setErr(true);
    }
  }

  function handleDeleteSkillSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.preventDefault();
    const confirmDelete = confirm("Click OK if you actually want to delete this");
    if (confirmDelete) {
      deleteSkill(id)
        .then(() => {
          console.log("skill deleted");
        });
    }
  }

  async function deleteSkill(id: string) {
    try {
      await ProfileService.deleteSkill(id);
      const deletedSkillsState = skills.filter(skill => skill.id != id);
      setSkills(deletedSkillsState);
    } catch (err) {
      setErr(true);
    }
  }

  function ShowAddSkill() {
    const [content, setContent] = useState<string>("");

    function handleContentChange(value: string): void{
      setContent(value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleAddSkillClose()} ></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Add to Your Skill Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleAddSkillClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <form className="add-skill-form">
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
                      onClick={(e) => handleAddSkillSubmit(e, content)}
                    >Save</button>
            </div>
          </form>
          {err && <ErrorMessage/>}
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
            <h2 className="expanded-profile-overlay-header-title">Edit Your Skill Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleEditSkillClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <div className="skills-cont">
            {skills.map(skill => {
            return (
              <div className="skill-cont" key={skill.id}>
                <div className="content-endorse-cont">
                  <p>{skill.content}</p>
                  <button className="primary-button" onClick={(e) => handleDeleteSkillSubmit(e, skill.id)}>Delete</button>
                </div>
                {skill.endorsments && <p>{skill.endorsments + " endorsements"}</p>}
              </div>
            );
            })}
          </div>
          {err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }

  return (
    <div className="profile-cont comp">
      <div className="profile-section-header">
        <h2 className="skills-header-title">Skills</h2>
        {props.userProfile && <div className="profile-experience-header-buttons">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleAddSkillClick()} ><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleEditSkillClick()}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
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
      {expandedAddSkill && <ShowAddSkill />}
      {expandedEditSkill && <ShowEditSkill />}
    </div>
  );
}
