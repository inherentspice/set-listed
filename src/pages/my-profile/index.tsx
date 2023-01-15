import React from "react";
import ProfileHero from "../../components/profile/profile-hero";
import ProfileAbout from "../../components/profile/profile-about";
import Featured from "../../components/profile/featured";

export default function MyProfile() {
  return (
    <div className="page-cont">
      <ProfileHero />
      <ProfileAbout />
      <Featured />
    </div>
  );
}
