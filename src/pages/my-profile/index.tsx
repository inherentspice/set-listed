import React from "react";
import ProfileHero from "../../components/profile/profile-hero";
import ProfileAbout from "../../components/profile/profile-about";
import Featured from "../../components/profile/featured";
import ProfileActivity from "../../components/profile/profile-activity";
import "./index.css";

export default function MyProfile() {
  return (
    <div className="page-cont">
      <ProfileHero />
      <ProfileAbout />
      <Featured />
      <ProfileActivity />
    </div>
  );
}
