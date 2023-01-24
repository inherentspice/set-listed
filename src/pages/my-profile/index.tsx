import React, { useState } from "react";
import { FakeUserData } from "../../dummy-data/fake-users";
import ProfileHero from "../../components/profile/profile-hero";
import ProfileAbout from "../../components/profile/profile-about";
import Featured from "../../components/profile/profile-featured";
import ProfileActivity from "../../components/profile/profile-activity";
import ProfileExperience from "../../components/profile/profile-experience";
import ProfileAwards from "../../components/profile/profile-awards";
import ProfilePotentialFriends from "../../components/profile/profile-friends";
import ProfileAnalytics from "../../components/profile/profile-analytics";
import ProfileResources from "../../components/profile/profile-resources";
import "./index.css";

export default function MyProfile() {
  const [currentUserProfile, setCurrentUserProfile] = useState(FakeUserData[0]);

  return (
    <div className="page-cont profile-page">
      <ProfileHero />
      <ProfileAnalytics />
      <ProfileResources />
      <ProfileAbout />
      <Featured />
      <ProfileActivity />
      <ProfileExperience />
      <ProfileAwards />
      <ProfilePotentialFriends />
    </div>
  );
}
