import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CancelButton from "../../media/icons/cancel.png";
import { AwardData } from "../../types/profile";
import ProfileService from "../../services/home/profile";
import ErrorMessage from "../error-message";
import "../../styles/profiles/profile-awards.css";


export default function ProfileAwards(props: {awards: AwardData[], user: string, userProfile: boolean}) {

  const [expandedAddAwards, setExpandedAddAwards] = useState<boolean>(false);
  const [expandedEditAwards, setExpandedEditAwards] = useState<null | string>(null);
  const [err, setErr] = useState<boolean>(false);
  const [awards, setAwards] = useState<AwardData[]>(props.awards);

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);

  function handleAddAwardsClick(): void{
    setExpandedAddAwards(true);
  }
  function handleEditAwardsClick(id: string): void{
    setExpandedEditAwards(id);
  }

  function handleAddAwardsClose(): void{
    setExpandedAddAwards(false);
  }
  function handleEditAwardsClose(): void{
    setExpandedEditAwards(null);
  }

  function handleAddAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string
  ) {
    e.preventDefault();
    addAward(content, props.user)
      .then(() => {
        console.log("award added");
      });
  }

  async function addAward(content: string, user: string) {
    const formData = {
      content,
      user
    };
    try {
      const newAward = await ProfileService.postAward(formData);
      const newAwards = awards.concat(newAward.data.award);
      setAwards(newAwards);
      handleAddAwardsClose();
    } catch (err) {
      setErr(true);
    }
  }

  function handleEditAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    id: string
  ) {
    e.preventDefault();
    addAwardEdit(content, id)
      .then(() => {
        console.log("award edited");
      });
  }

  async function addAwardEdit(content: string, id: string) {
    const formData = {
      content
    };
    try {
      const editedAward = await ProfileService.editAward(formData, id);
      const editedIndex = awards.map(function(award) {return award.id;}).indexOf(editedAward.data.award.id);
      const editedAwards = awards;
      editedAwards.splice(editedIndex, 1, editedAward.data.award);
      setAwards(editedAwards);
      handleEditAwardsClose();
    } catch (err) {
      setErr(true);
    }
  }

  function handleDeleteAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.preventDefault();
    const confirmDelete = confirm("Click OK if you actually want to delete this");
    if (confirmDelete) {
      deleteAward(id)
        .then(() => {
          console.log("award deleted");
        });
    }
  }

  async function deleteAward(id: string) {
    try {
      await ProfileService.deleteAward(id);
      const deletedAwardsState = awards.filter(award => award.id != id);
      setAwards(deletedAwardsState);
      handleEditAwardsClose();
    } catch (err) {
      setErr(true);
    }
  }

  function ShowAddAwards() {
    const [content, setContent] = useState<string>("");

    function handleContentChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setContent(e.target.value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleAddAwardsClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
              <h2 className="expanded-profile-overlay-title">Add Your Awards</h2>
              <img className="start-post-cancel" src={CancelButton} onClick={() => handleAddAwardsClose()} />
          </div>
          <form className="add-experience-form">
            <label className="add-experience-form-item">Award:
              <input placeholder="Ex: Best Heckler @ Mochi's Bar" value={content} onChange={handleContentChange}></input>
            </label>
            <div className="expanded-profile-overlay-submit">
              <button className="expanded-profile-overlay-submit-btn" type="submit" onClick={(e) => handleAddAwardSubmit(e, content)}>Save</button>
            </div>
          </form>
          {err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }

  function ShowEditAwards() {
    const expAward = props.awards.filter((award) => award.id === expandedEditAwards)[0];
    const [content, setContent] = useState<string>(expAward.content);

    function handleContentChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setContent(e.target.value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleEditAwardsClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-title">Edit Your Award</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditAwardsClose()} />
          </div>
          <form className="add-experience-form">
            <div className="add-experience-form-item">
              <label>Award:</label>
              <input defaultValue={content} onChange={handleContentChange}></input>
            </div>
            <div className="expanded-profile-overlay-submit">
              <button
                className="expanded-profile-overlay-submit-btn"
                type="submit"
                onClick={(e) => handleEditAwardSubmit(e, content, expAward.id)}
              >Save Edits</button>
              <button
                className="expanded-profile-overlay-submit-btn"
                onClick={(e) => handleDeleteAwardSubmit(e, expAward.id)}
              >Delete Award</button>
            </div>
          </form>
          {err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }

  return (
    <div className="profile-cont comp">
      <div className="profile-section-header">
        <h2 className="awards-header-title">Awards & Achievements</h2>
        {props.userProfile && <div className="profile-experience-header-buttons">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleAddAwardsClick()}><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>
        </div>}
      </div>
      <div className="awards-cont">
        {awards.length <=0 ? <p>You haven't added any awards yet.</p> : awards.map(award => {
          return (
          <div className="award-cont" key={award.id}>
            <h4>{award.content}</h4>
            {props.userProfile && <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditAwardsClick(award.id)} />}
          </div>
          );
        })}
      </div>
      {expandedAddAwards && <ShowAddAwards />}
      {expandedEditAwards && <ShowEditAwards />}
    </div>
  );
}
