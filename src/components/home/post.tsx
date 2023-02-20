import React from "react";
import Profile from "../../media/home/profile-picture.png";

export default function Post(props: {profileImg: string | undefined}) {
  return (
    <div className="home-post-cont comp">
      <div className="post-button-cont">
        <img src={props.profileImg} alt="" className="profile-picture-small"/>
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
