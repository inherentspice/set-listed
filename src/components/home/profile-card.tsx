import React from "react";
import { FakeUserData } from "../../dummy-data/fake-users";

export default function ProfileCard(){
  return(
    <div className='profile-card-cont comp'>
      <div className='profile-card-user-cont'>

        <div className='profile-card-user-img-cont'>
          <img className='profile-card-background-img' src={FakeUserData[0].userBackgroundPicture} alt="" />
          <img className='profile-card-user-img profile-picture-medium' src={FakeUserData[0].userProfilePicture} alt=""/>
        </div>

        <div className='profile-card-user-info-cont'>
          <div className='profile-card-user-name'>{FakeUserData[0].userFirstName+" "+FakeUserData[0].userLastName}</div>
          <div className='profile-card-user-tagline'>{FakeUserData[0].userTagline}</div>
        </div>
      </div>

      <div className='profile-card-interaction-stats-cont'>
        <div className='profile-card-interaction-stats-item'>
          <div className='profile-card-interaction-stat-name'>Who&apos;s viewed your profile</div>
          <div className='profile-card-interaction-stat'>{FakeUserData[0].userProfileViews}</div>
        </div>

        <div className='profile-card-interaction-stats-item'>
          <div className='profile-card-interaction-stat-name'>Impressions of your post</div>
          <div className='profile-card-interaction-stat'>{FakeUserData[0].userPostImpressions}</div>
        </div>
      </div>

      <div className='profile-card-ad-cont'>
        <div>Access exclusive tool and insights</div>
        <div>Try Premium for Free Brokie</div>
      </div>
    </div>
  );
}
