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
import ConnectionService from "../../services/home/connection";
import { Connections } from "../../types/my-network";

export default function BuildProfilePage() {
  const [profile, setProfile] = useState< ProfileData | undefined>(undefined);
  const [connections, setConnections] = useState<Connections | null>(null);
  const { profileid } = useParams<string>();
  const { userId } = useUserId();

  useEffect(() => {
    async function fetchProfile() {
      if (profileid && userId) {
        try {
          if (profileid !== userId) {
            await ProfileService.editProfileViews(profileid);
          }
          const profileInfo = await ProfileService.getProfile(profileid);
          const profileInfoData = profileInfo.data;
          setProfile(profileInfoData);
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetchProfile();

  }, [profileid, userId]);

  useEffect(() => {
    async function viewConnections() {
      try {
        const viewingUserConnections = await ConnectionService.getConnections(userId);
        setConnections(viewingUserConnections.data.connection);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId !== profileid && userId && profileid && connections===null) {
      viewConnections();
    }
  }, [profileid, userId, connections]);

  return (
    <>
     {profile && <div className="page-cont">
       <div className="profile-page">
        <div className="profile-page-left">
          <ProfileHero userProfile={userId === profileid} profileCard={profile.profileCard} viewingUser={userId} connections={connections}/>
          {userId === profileid && <ProfileAnalytics profileCard={profile.profileCard}/>}
          {userId === profileid && <ProfileResources />}
          <ProfileAbout userProfile={userId === profileid} about={profile.about}/>
          <Featured userProfile={userId === profileid} user={profileid ? profileid : ""} featured={profile.featured}/>
          <ProfileActivity userProfile={userId === profileid} profileCard={profile.profileCard} posts={profile.post} viewingUser={userId}/>
          <ProfileExperience userProfile={userId === profileid} user={profileid ? profileid : ""} experience={profile.experience}/>
          <ProfileSkills userProfile={userId === profileid} user={profileid ? profileid : ""} skills={profile.skill}/>
          <ProfileAwards userProfile={userId === profileid} user={profileid ? profileid : ""} awards={profile.award}/>
        </div>

        <div className="profile-page-right">
          <ProfilePotentialFriends />
        </div>
        </div>
    </div>}
    </>
  );
}
