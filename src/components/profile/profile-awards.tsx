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
              <h2 className="expanded-profile-overlay-header-title">Add Your Awards</h2>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleAddAwardsClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <form className="add-experience-form">
            <label className="add-experience-form-item">Award:
              <input placeholder="Ex: Best Heckler @ Mochi's Bar" value={content} onChange={handleContentChange}></input>
            </label>
            <div className="expanded-profile-overlay-submit">
              <button className="secondary-button" type="submit" onClick={(e) => handleAddAwardSubmit(e, content)}>Save</button>
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
            <h2 className="expanded-profile-overlay-header-title">Edit Your Award</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleEditAwardsClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <form className="add-experience-form">
            <div className="add-experience-form-item">
              <label>Award:</label>
              <input defaultValue={content} onChange={handleContentChange}></input>
            </div>
            <div className="expanded-profile-overlay-submit">
              <button
                className="secondary-button"
                type="submit"
                onClick={(e) => handleEditAwardSubmit(e, content, expAward.id)}
              >Save Edits</button>
              <button
                className="secondary-button"
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
            {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-body-button" onClick={() => handleEditAwardsClick(award.id)}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>}
          </div>
          );
        })}
      </div>
      {expandedAddAwards && <ShowAddAwards />}
      {expandedEditAwards && <ShowEditAwards />}
    </div>
  );
}
