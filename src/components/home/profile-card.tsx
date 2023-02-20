import React from "react";
import { FakeUserData } from "../../dummy-data/fake-users";
import { ProfileCardData } from "../../types/profile";

export default function ProfileCard(props: {profile: ProfileCardData}){


  return(
    <div className='profile-card-cont comp'>
      <div className='profile-card-user-cont'>

        <div className='profile-card-user-img-cont'>
          <img className='profile-card-background-img' src={props.profile.backgroundImage || "https://res.cloudinary.com/dhptcrsjc/image/upload/v1675955714/Set-Listed/default-background_wyziyb.png"} alt="" />
          <img className='profile-card-user-img profile-picture-medium' src={props.profile.image} alt=""/>
        </div>

        <div className='profile-card-user-info-cont'>
          <div className='profile-card-user-name'>{props.profile.firstName+" " + props.profile.lastName}</div>
          <div className='profile-card-user-tagline'>{props.profile.tagline}</div>
        </div>
      </div>

      <div className='profile-card-interaction-stats-cont'>
        <div className='profile-card-interaction-stats-item'>
          <div className='profile-card-interaction-stat-name'>Who&apos;s viewed your profile</div>
          <div className='profile-card-interaction-stat'>{props.profile.userProfileViews}</div>
        </div>

        <div className='profile-card-interaction-stats-item'>
          <div className='profile-card-interaction-stat-name'>Impressions of your post</div>
          <div className='profile-card-interaction-stat'>{props.profile.userPostImpressions}</div>
        </div>
      </div>

      <div className='profile-card-ad-cont'>
        <div>Access exclusive tool and insights</div>
        <div>Try Premium for Free Brokie</div>
      </div>
    </div>
  );
}
