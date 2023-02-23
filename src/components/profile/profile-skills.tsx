import React, {useState} from "react";
import ReactDOM from "react-dom";
import { SkillData } from "../../types/profile";
import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import CancelButton from "../../media/icons/cancel.png";
import ProfileService from "../../services/home/profile";

export default function ProfileSkills(props: {skills: SkillData[], user: string, userProfile: boolean}) {

  const [expandedAddSkill, setExpandedAddSkill] = useState<boolean>(false);
  const [expandedEditSkill, setExpandedEditSkill] = useState<boolean>(false);
  const [skills, setSkills] = useState(props.skills);

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
        handleAddSkillClose();
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
    } catch (err) {
      console.log(err);
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
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  async function deleteSkill(id: string) {
    try {
      const deletedConfirmation = await ProfileService.deleteSkill(id);
      const deletedSkillsState = skills.filter(skill => skill.id != id);
      setSkills(deletedSkillsState);
      console.log(deletedConfirmation);
    } catch (err) {
      console.log(err);
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
            <h2 className="expanded-edit-about-title">Add to Your Skill Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleAddSkillClose()} />
          </div>
          <form>
            <label className="add-experience-form-item">
              <select value={content} onChange={(e) => handleContentChange(e.target.value)}>
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
                      className="expanded-profile-overlay-submit-btn"
                      type="submit"
                      onClick={(e) => handleAddSkillSubmit(e, content)}
                    >Save</button>
            </div>
          </form>
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
        </div>
      </>,
      document.body
    );
  }

  return (
    <div className="profile-cont comp">
      <div className="editable-comp-header">
        <h2>Skills</h2>
        {props.userProfile && <div className="profile-experience-header-buttons">
          <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddSkillClick()} />
          <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditSkillClick()}/>
        </div>}
      </div>
      <div className="skills-cont">
        {skills.map((skill) => {
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
