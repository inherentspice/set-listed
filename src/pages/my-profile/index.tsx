import React, { useEffect, useState } from "react";
import ProfileHero from "../../components/profile/profile-hero";
import ProfileAbout from "../../components/profile/profile-about";
import Featured from "../../components/profile/profile-featured";
import ProfileActivity from "../../components/profile/profile-activity";
import ProfileExperience from "../../components/profile/profile-experience";
import ProfileAwards from "../../components/profile/profile-awards";
import ProfilePotentialFriends from "../../components/profile/profile-friends";
import ProfileSkills from "../../components/profile/profile-skills";
import ProfileAnalytics from "../../components/profile/profile-analytics";
import ProfileResources from "../../components/profile/profile-resources";
import { useParams } from "react-router-dom";
import ProfileService from "../../services/home/profile";
import ProfileData from "../../types/profile";
import "./index.css";

export default function BuildProfilePage() {
  const [profile, setProfile] = useState< ProfileData | undefined>(undefined);
  const { userid } = useParams();

  useEffect(() => {
    (async function() {
      if (userid) {
        try {
          const profileInfo = await ProfileService.getProfile(userid);
          const profileInfoData = profileInfo.data;
          setProfile(profileInfoData);
        } catch (err) {
          console.log(err);
        }
      }
    }());
  }, []);

  return (
    <>
     {profile && <div className="page-cont profile-page">
        <ProfileHero profileCard={profile.profileCard}/>
        <ProfileAnalytics profileCard={profile.profileCard}/>
        <ProfileResources />
        <ProfileAbout about={profile.about}/>
        <Featured user={profile.profileCard[0].user} featured={profile.featured}/>
        <ProfileActivity profileCard={profile.profileCard} posts={profile.post}/>
        <ProfileExperience user={profile.profileCard[0].user} experience={profile.experience}/>
        <ProfileSkills skills={profile.skill}/>
        <ProfileAwards awards={profile.award}/>
        <ProfilePotentialFriends />
    </div>}
    </>
  );
}
