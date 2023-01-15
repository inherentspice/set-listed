import React from "react";
import { FakeUserData } from "../../dummy-data/fake-users";
import "../../styles/profile-about.css";

export default function ProfileAbout() {

  return(
    <div className="profile-about-cont">
      <div className="profile-about-title">About</div>
      <div className="profile-about-text">{FakeUserData.about}</div>
    </div>
  );
}
