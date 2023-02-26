import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CancelButton from "../../media/icons/cancel.png";
import { AwardData } from "../../types/profile";
import ProfileService from "../../services/home/profile";
import "../../styles/profiles/profile-awards.css";


export default function ProfileAwards(props: {awards: AwardData[], user: string, userProfile: boolean}) {

  const [expandedAddAwards, setExpandedAddAwards] = useState<boolean>(false);
  const [expandedEditAwards, setExpandedEditAwards] = useState<null | string>(null);
  const [awards, setAwards] = useState<AwardData[]>(props.awards);

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
        handleAddAwardsClose();
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

    } catch (err) {
      console.log(err);
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
        handleEditAwardsClose();
      }).catch((err) => {
        console.log(err);
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
    } catch (err) {
      console.log(err);
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
          handleEditAwardsClose();
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  async function deleteAward(id: string) {
    try {
      const deletedConfirmation = await ProfileService.deleteAward(id);
      console.log(deletedConfirmation);
      const deletedAwardsState = awards.filter(award => award.id != id);
      setAwards(deletedAwardsState);
    } catch (err) {
      console.log(err);
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

        </div>
      </>,
      document.body
    );
  }

  return (
    <div className="profile-cont comp">
      <div className="editable-comp-header">
        <h2>Awards & Achievements</h2>
        {props.userProfile && <div className="profile-experience-header-buttons">
          <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddAwardsClick()} />
        </div>}
      </div>
      <div className="awards-cont">
        {awards.map(award => {
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
