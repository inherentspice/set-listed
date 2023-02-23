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
import { useUserId } from "../../context/userIdContext";
import "./index.css";

export default function BuildProfilePage() {
  const [profile, setProfile] = useState< ProfileData | undefined>(undefined);
  const { profileid } = useParams<string>();
  const { userId } = useUserId();

  useEffect(() => {
    async function fetchProfile() {
      if (profileid) {
        try {
          const profileInfo = await ProfileService.getProfile(profileid);
          const profileInfoData = profileInfo.data;
          setProfile(profileInfoData);
        } catch (err) {
          console.log(err);
        }
      }
    }

    if (profileid) {
      fetchProfile();
    }
  }, [profileid]);

  return (
    <>
     {profile && <div className="page-cont profile-page">
        <ProfileHero userProfile={userId === profileid} profileCard={profile.profileCard}/>
        {userId === profileid && <ProfileAnalytics profileCard={profile.profileCard}/>}
        {userId === profileid && <ProfileResources />}
        <ProfileAbout userProfile={userId === profileid} about={profile.about}/>
        <Featured userProfile={userId === profileid} user={profile.profileCard[0].user} featured={profile.featured}/>
        <ProfileActivity userProfile={userId === profileid} profileCard={profile.profileCard} posts={profile.post} viewingUser={userId}/>
        <ProfileExperience userProfile={userId === profileid} user={profile.profileCard[0].user} experience={profile.experience}/>
        <ProfileSkills userProfile={userId === profileid} user={profile.profileCard[0].user} skills={profile.skill}/>
        <ProfileAwards userProfile={userId === profileid} user={profile.profileCard[0].user} awards={profile.award}/>
        <ProfilePotentialFriends />
    </div>}
    </>
  );
}
