import React from "react";
import convertDate from "../../utilities/convert-date";

interface feedProps {
  postData:
    {
      name: string,
      tagLine: string,
      posted: Date,
      post: string,
      profileImage?: string
    }
}

export default function Feed(props: feedProps) {
  return (
    <div className="home-feed-cont home-comp">
      <div className="profile-info-cont">
        {props.postData.profileImage ?
          <img src={props.postData.profileImage} alt="" className="profile-picture-small"/>
          : <></>}
        <div className="profile-text-info-cont">
          <p className="profile-name">{props.postData.name}</p>
          <p className="profile-tag">{props.postData.tagLine}</p>
          <p className="profile-tag">{convertDate(props.postData.posted)}</p>
        </div>
      </div>
      <p>{props.postData.post}</p>
    </div>
  );
}
