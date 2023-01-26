import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FakeUserData } from "../../dummy-data/fake-users";
import "../../styles/profile-about.css";
import Edit from "../../media/icons/edit.png";
import { useParams } from "react-router-dom";
import CancelButton from "../../media/icons/cancel.png";

export default function ProfileAbout() {
  const [expandedEditAbout, setExpandedEditAbout] = useState<null | number>(null);

  const { username } = useParams();
  const userIndex = FakeUserData.findIndex(x => x.username === username);

  function handleEditAboutClick(id: number): void{
    setExpandedEditAbout(id);
  }

  function handleEditAboutClose(): void{
    setExpandedEditAbout(null);
  }

  function ShowEditProfileAbout() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-edit-profile-cont" key={FakeUserData[userIndex].id}></div>
        <div className="expanded-edit-profile">
          <div className="edit-profile-about-header-cont">
            <div className="expanded-edit-about-title">Edit Your About Section</div>
            <img className="edit-profile-about-cancel" src={CancelButton} onClick={() => handleEditAboutClose()} />
          </div>
          <div className="edit-profile-about-body">
            <div className="edit-profile-about-explanation"></div>
            <form className="edit-profile-about-form">
              <textarea className="edit-profile-about-text-area" defaultValue={FakeUserData[userIndex].about} rows={10} cols={70} maxLength={2000}></textarea>
              <div className="edit-profile-about-submit">
                <button className="edit-profile-about-submit-btn" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </>,
      document.body
    );
  }


  return(
    <div className="profile-about-cont comp">
      <div className="profile-about-title-cont">
        <div className="profile-about-title">About</div>
        <img className="profile-about-edit" src={Edit} onClick={() => handleEditAboutClick(FakeUserData[userIndex].id)} />
      </div>
      <div className="profile-about-text">{FakeUserData[userIndex].about}</div>
      {expandedEditAbout && <ShowEditProfileAbout />}
    </div>
  );
}
