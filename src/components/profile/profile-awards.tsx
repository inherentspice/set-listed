import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CancelButton from "../../media/icons/cancel.png";
import { AwardData } from "../../types/profile";


export default function ProfileAwards(props: {awards: AwardData[]}) {


  const [expandedAddAwards, setExpandedAddAwards] = useState<boolean>(false);
  const [expandedEditAwards, setExpandedEditAwards] = useState<null | string>(null);

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

  function ShowAddAwards() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleAddAwardsClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
              <h2 className="expanded-profile-overlay-title">Add Your Awards</h2>
              <img className="start-post-cancel" src={CancelButton} onClick={() => handleAddAwardsClose()} />
          </div>
          <form className="add-experience-form">
            <div className="add-experience-form-item">
              <label>Award:</label>
              <input placeholder="Ex: Best Heckler @ Mochi's Bar"></input>
            </div>
            <div className="expanded-profile-overlay-submit">
              <button className="expanded-profile-overlay-submit-btn" type="submit">Save</button>
            </div>
          </form>
        </div>
      </>,
      document.body
    );
  }

  function ShowEditAwards() {
    const expAward = props.awards.filter((award) => award.id === expandedEditAwards)[0];
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
              <input defaultValue={expAward.content}></input>
            </div>
            <div className="expanded-profile-overlay-submit">
              <button className="expanded-profile-overlay-submit-btn" type="submit">Save</button>
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
        <div className="profile-experience-header-buttons">
          <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddAwardsClick()} />
        </div>
      </div>
      <div className="awards-cont">
        {props.awards.map(award => {
          return (
          <div className="award-cont" key={award.id}>
            <h4>{award.content}</h4>
            <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditAwardsClick(award.id)} />
          </div>
          );
        })}
      </div>
      {expandedAddAwards && <ShowAddAwards />}
      {expandedEditAwards && <ShowEditAwards />}
    </div>
  );
}
