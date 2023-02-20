import React, { useState, useEffect } from "react";
import ProfileService from "../../services/home/profile";
import { PostData, ProfileCardData } from "../../types/profile";
import convertDate from "../../utilities/convert-date";

export default function Feed(props: {post: PostData}) {

  const [profile, setProfile] = useState<ProfileCardData | undefined>(undefined);
  console.log(profile);
  useEffect(() => {
    (async function() {
      try {
        const userProfile = await ProfileService.getProfileCard(props.post.user);
        setProfile(userProfile.data.profileCard[0]);
      } catch (err) {
        console.log(err);
      }
  }());
  }, []);

  console.log(profile);
  return (
    <div className="home-feed-cont comp">
      <div className="profile-info-cont">
        {profile?.image ?
          <img src={profile.image} alt="" className="profile-picture-small"/>
          : <></>}
        <div className="profile-text-info-cont">
          <p className="profile-name">{profile?.firstName} {profile?.lastName}</p>
          <p className="profile-tag">{profile?.tagline}</p>
          <p className="profile-tag">{convertDate(props.post.createdAt)}</p>
        </div>
      </div>
      <p>{props.post.content}</p>
    </div>
  );
}
