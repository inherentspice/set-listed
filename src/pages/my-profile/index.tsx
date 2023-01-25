import React from "react";
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
import { FakeUserData } from "../../dummy-data/fake-users";
import "./index.css";

export default function BuildProfilePage() {
  

  return (
    <div className="page-cont profile-page">
      <ProfileHero />
      <ProfileAnalytics />
      <ProfileResources />
      <ProfileAbout />
      <Featured />
      <ProfileActivity />
      <ProfileExperience />
      <ProfileSkills />
      <ProfileAwards />
      <ProfilePotentialFriends />
    </div>
  );
}
