import React, { useState } from "react";
import ReactDOM from "react-dom";
import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import ArrowForward from "../../media/icons/arrow-forward.png";
import CancelButton from "../../media/icons/cancel.png";
import { FakeUserData } from "../../dummy-data/fake-users";
import shortenText from "../../utilities/shorten-text";


export default function ProfileFeatured() {
  const [featureIndex, setFeatureIndex] = useState(0);
  // When backend is implemented, type of useState will change to <null | string>
  const [expandedPost, setExpandedPost] = useState<null | number>(null);

  function handleNextClick(): void{
    setFeatureIndex(prevState => {
      let nextIndex = prevState + 1;
      if (nextIndex >= Math.ceil(FakeUserData[0].featured.length / 3)) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  }

  // When backend is implemented, type of id will change to string
  function handlePostClick(id: number): void{
    setExpandedPost(id);
  }

  // Uses createPortal to insert new div into the body
  function ShowExpandedPost() {
    const expandedPostData = FakeUserData[0].featured.filter((featuredPost) => featuredPost.id === expandedPost)[0];
    return ReactDOM.createPortal(
      <>
        <div className="expanded-post-cont" key={expandedPostData.id}></div>
        <div className="expanded-post">
          <img src={expandedPostData.img} alt=""/>
          <div className="expanded-text">
            <h4>{expandedPostData.name}</h4>
            <p>{expandedPostData.description}</p>
          </div>
          <img src={CancelButton} alt="" onClick={handleExpandedImageClose} className="close-button"></img>
        </div>
      </>,
      document.body
    );
  }

  function handleExpandedImageClose(): void{
    setExpandedPost(null);
  }

  return (
    <div className="profile-cont comp">
      <div className="editable-comp-header">
        <h2>Featured</h2>
        <div className="profile-experience-header-buttons">
          <img className="profile-experience-header-btn" src={Add} />
          <img className="profile-experience-header-btn" src={Edit} />
        </div>
      </div>
      <div className="featured-post-cont">
        {FakeUserData[0].featured
        .filter((featuredPost, index) => index >= featureIndex && index < featureIndex + 3)
        .map((featuredPost) => {
          return (
            <div className="featured-post" key={featuredPost.id} onClick={() => handlePostClick(featuredPost.id)}>
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
      {expandedPost && <ShowExpandedPost/>}
    </div>
  );
}
