import React from "react";
import { FakeUserData } from "../../dummy-data/fake-users";
import "../../styles/profile-about.css";
import Edit from "../../media/icons/edit.png";

export default function ProfileAbout() {

  return(
    <div className="profile-about-cont comp">
      <div className="profile-about-title-cont">
        <div className="profile-about-title">About</div>
        <img className="profile-about-edit" src={Edit} />
      </div>
      <div className="profile-about-text">{FakeUserData.about}</div>
    </div>
  );
}
