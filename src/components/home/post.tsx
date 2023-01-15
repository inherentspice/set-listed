import React from "react";
import Profile from "../../media/home/profile-picture.png";

export default function Post() {
  return (
    <div className="home-post-cont home-comp">
      <div className="post-button-cont">
        <img src={Profile} alt="" className="profile-picture-small"/>
        <button className="start-post-btn">Start a post</button>
      </div>
      <div className="specific-post-cont">
        <button className="post-option-btn">Photo</button>
        <button className="post-option-btn">Video</button>
        <button className="post-option-btn">Sets</button>
        <button className="post-option-btn">Write Article</button>
      </div>
    </div>
  );
}
