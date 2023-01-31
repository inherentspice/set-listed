import React, { ReactPortal, useState } from "react";
import ReactDOM from "react-dom";
import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import ArrowForward from "../../media/icons/arrow-forward.png";
import CancelButton from "../../media/icons/cancel.png";
import { FakeUserData } from "../../dummy-data/fake-users";
import shortenText from "../../utilities/shorten-text";
import { useParams } from "react-router-dom";
import "../../styles/profile-featured.css";


export default function ProfileFeatured() {
  const { username } = useParams();
  const userIndex = FakeUserData.findIndex(x => x.username === username);

  const [featureIndex, setFeatureIndex] = useState(0);
  // When backend is implemented, type of useState will change to <null | string>
  const [expandedPost, setExpandedPost] = useState<null | number>(null);

  const [expandedAddFeatured, setExpandedAddFeatured] = useState<null | number>(null);
  const [expandedEditFeatured, setExpandedEditFeatured] = useState<null | number>(null);

  function handleAddFeaturedClick(id: number): void{
    setExpandedAddFeatured(id);
  }
  function handleEditFeaturedClick(id: number): void{
    setExpandedEditFeatured(id);
  }

  function handleAddFeaturedClose(): void{
    setExpandedAddFeatured(null);
  }
  function handleEditFeaturedClose(): void{
    setExpandedEditFeatured(null);
  }

  function ShowAddFeatured() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={FakeUserData[userIndex].id}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Add to Your Featured Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleAddFeaturedClose()} />
          </div>
        </div>
      </>,
      document.body
    );
  }

  function ShowEditFeatured() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={FakeUserData[userIndex].id}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Edit Your Featured Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditFeaturedClose()} />
          </div>
          <div className="edit-featured-cont">
            {FakeUserData[userIndex].featured.map((featuredPost) => {
              return (
                <div className="edit-featured-item-cont" key={featuredPost.id}>
                  <div className="edit-featured-item">
                    <img className="edit-featured-img" src={featuredPost.img} alt=""/>
                    <div className="edit-featured-info-cont">
                      <h4>{featuredPost.name}</h4>
                      {featuredPost.description.length <= 150 ?
                      <p>{featuredPost.description}</p> :
                      <p>{shortenText(featuredPost.description, 150)}</p>}
                    </div>
                  </div>
                  <div className="remove-featured-item">
                    <button className="remove-featured-item-btn">Remove this featured item</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>,
      document.body
    );
  }


  function handleNextClick(): void{
    setFeatureIndex(prevState => {
      let nextIndex = prevState + 1;
      if (nextIndex >= Math.ceil(FakeUserData[userIndex].featured.length / 3)) {
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

  function ShowExpandedPost(): ReactPortal{
    const expandedPostData = FakeUserData[userIndex].featured.filter((featuredPost) => featuredPost.id === expandedPost)[0];
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
          <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddFeaturedClick(FakeUserData[userIndex].id)} />
          <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditFeaturedClick(FakeUserData[userIndex].id)}/>
        </div>
      </div>
      <div className="featured-post-cont">
        {FakeUserData[userIndex].featured
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

      {/* if featured post is clicked, this expands the post */}
      {expandedPost && <ShowExpandedPost/>}
      {expandedAddFeatured && <ShowAddFeatured/>}
      {expandedEditFeatured && <ShowEditFeatured/>}
    </div>
  );
}
