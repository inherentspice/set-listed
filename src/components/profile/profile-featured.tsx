import React, { useState } from "react";
import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import ArrowForward from "../../media/icons/arrow-forward.png";
import { FakeUserData } from "../../dummy-data/fake-users";
import shortenText from "../../utilities/shorten-text";


export default function Featured() {

  const [featureIndex, setFeatureIndex] = useState(0);

  function handleNextClick() {
    setFeatureIndex(prevState => {
      let nextIndex = prevState + 1;
      if (nextIndex >= Math.ceil(FakeUserData.featured.length / 3)) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  }

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
        {FakeUserData.featured
        .filter((featuredPost, index) => index >= featureIndex && index < featureIndex + 3)
        .map((featuredPost) => {
          return (
            <div className="featured-post" key={featuredPost.id}>
              <img src={featuredPost.img} alt=""/>
              <h4>{featuredPost.name}</h4>
              {featuredPost.description.length <= 150 ?
              <p>{featuredPost.description}</p> :
              <p>{shortenText(featuredPost.description, 150)}</p>}
            </div>
          );
        })}
      </div>
      <img className="arrow-button" src={ArrowForward} alt="" onClick={handleNextClick}></img>
    </div>
  );
}
