import React from "react";
import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import { FakeUserData } from "../../dummy-data/fake-users";

export default function Featured() {
  console.log(FakeUserData);
  return (
    <div className="featured-cont comp">
      <div className="featured-header">
        <h2>Featured</h2>
        <div className="profile-experience-header-buttons">
          <img className="profile-experience-header-btn" src={Add} />
          <img className="profile-experience-header-btn" src={Edit} />
        </div>
      </div>
      <div className="featured-post-cont">
        {FakeUserData.featured.map((featuredPost) => {
          return (
            <div className="featured-post">
              <img src={featuredPost.img} alt=""/>
              <h4>{featuredPost.name}</h4>
              <p>{featuredPost.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
