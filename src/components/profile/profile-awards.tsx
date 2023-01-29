import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import { FakeUserData } from "../../dummy-data/fake-users";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CancelButton from "../../media/icons/cancel.png";

export default function ProfileAwards() {
  const { username } = useParams();
  const userIndex = FakeUserData.findIndex(x => x.username === username);

  const [expandedAddAwards, setExpandedAddAwards] = useState<null | number>(null);
  const [expandedEditAwards, setExpandedEditAwards] = useState<null | number>(null);
  const [awardsIndex, setAwardsIndex] = useState(-1);

  function handleAddAwardsClick(id: number): void{
    setExpandedAddAwards(id);
  }
  function handleEditAwardsClick(id: number, index: number): void{
    setExpandedEditAwards(id);
    setAwardsIndex(index);
    console.log("click");
  }

  function handleAddAwardsClose(): void{
    setExpandedAddAwards(null);
  }
  function handleEditAwardsClose(): void{
    setExpandedEditAwards(null);
  }

  function ShowAddAwards() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={FakeUserData[userIndex].id}></div>
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
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={FakeUserData[userIndex].id}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-title">Edit Your Award</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditAwardsClose()} />
          </div>
          <form className="add-experience-form">
            <div className="add-experience-form-item">
              <label>Award:</label>
              <input defaultValue={FakeUserData[userIndex].awards[awardsIndex].title}></input>
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
          <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddAwardsClick(FakeUserData[userIndex].id)} />
        </div>
      </div>
      <div className="awards-cont">
        {FakeUserData[userIndex].awards.map(award => {
          return (
          <div className="award-cont" key={award.id}>
            <h4>{award.title}</h4>
            <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditAwardsClick(FakeUserData[userIndex].id, FakeUserData[userIndex].awards.indexOf(award))} />
          </div>
          );
        })}
      </div>
      {expandedAddAwards && <ShowAddAwards />}
      {expandedEditAwards && <ShowEditAwards />}
    </div>
  );
}
