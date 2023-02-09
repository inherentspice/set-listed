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
import { FakeUserData } from "../../dummy-data/fake-users";
import ProfileCardService from "../../services/home/profile";
import "./index.css";

export default function BuildProfilePage() {
  console.log(useParams);
  const [profile, setProfile] = useState({});
  useEffect(()=> {
    (async function() {
      const profileInfo = await ProfileCardService.getProfile("63dddee66d67ea2e63f428f1");
      setProfile(profileInfo.data);
    }());
  }, []);

  console.log(profile);

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
