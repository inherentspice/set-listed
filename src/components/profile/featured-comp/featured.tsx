import React, { ReactPortal, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ArrowForward from "../../../media/icons/arrow-forward.png";
import shortenText from "../../../utilities/shorten-text";
import "../../../styles/profiles/profile-featured.css";
import ProfileService from "../../../services/home/profile";
import { FeaturedData } from "../../../types/profile";
import ErrorMessage from "../../error-message";
import ShowAddFeatured from "./Show-Add-Featured";
import ShowEditFeaturedOverview from "./Show-Edit-Featured-Overview";
import ShowExpandedPost from "./Show-Expanded-Post";
import ShowEditFeaturedItem from "./Show-Edit-Featured-Item";


export default function ProfileFeatured(props: {featured: FeaturedData[], user: string, userProfile: boolean}) {

  const [featureIndex, setFeatureIndex] = useState(0);
  const [expandedPost, setExpandedPost] = useState<null | string>(null);
  const [err, setErr] = useState<boolean>(false);
  const [featured, setFeatured] = useState<FeaturedData[]>(props.featured);

  const [expandedAddFeatured, setExpandedAddFeatured] = useState<boolean>(false);
  const [expandedEditFeaturedOverview, setExpandedEditFeaturedOverview] = useState<boolean>(false);
  const [expandedEditFeaturedItem, setExpandedEditFeaturedItem] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);

  function handleAddFeaturedToggle(): void{
    setExpandedAddFeatured(!expandedAddFeatured);
  }

  function handleEditFeaturedToggle(): void{
    setExpandedEditFeaturedOverview(!expandedEditFeaturedOverview);
  }

  function handleEditFeaturedItemToggle(id: string): void{
    setExpandedEditFeaturedOverview(false);
    setExpandedEditFeaturedItem(expandedEditFeaturedItem == "" ? id : "");
  }

  function handleNextClick(): void{
    setFeatureIndex(prevState => {
      let nextIndex = prevState + 1;
      if (nextIndex >= Math.ceil(featured.length / 3)) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  }

  function handlePostClick(id: string | undefined): void{
    if (id) {
      setExpandedPost(id);
    }
  }

  return (
    <div className="profile-cont comp">
      <div className="profile-section-header">
        <h2 className="featured-header-title">Spotlight</h2>
        <div className="profile-experience-header-buttons">
          {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleAddFeaturedToggle()}><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>}
          {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleEditFeaturedToggle()}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" /></svg>}
        </div>
      </div>
      <div className="featured-post-cont">
        {featured.length <= 0 ? <p className="featured-no-featured-message">Spotlight your best content, videos, jokes, and more by clicking the add button above.</p> : featured
        .filter((featuredPost, index) => index >= featureIndex && index < featureIndex + 3)
        .map((featuredPost) => {
          return (
            <div className="featured-post" key={featuredPost.id} onClick={() => handlePostClick(featuredPost.id)}>
              <img src={featuredPost.image} alt=""/>
              <h4>{featuredPost.title}</h4>
              {featuredPost.content.length <= 150 ?
              <p>{featuredPost.content}</p> :
              <p>{shortenText(featuredPost.content, 150)}</p>}
            </div>
          );
        })}
      </div>
      {featured.length <= 3 ? "" : <img className="arrow-button" src={ArrowForward} alt="" onClick={handleNextClick}></img>}

      {/* if featured post is clicked, this expands the post */}
      {expandedPost && <ShowExpandedPost featured={featured} expandedPost={expandedPost} setExpandedPost={setExpandedPost} />}
      {expandedAddFeatured && <ShowAddFeatured handleAddFeaturedToggle={handleAddFeaturedToggle} err={err} user={props.user} featured={featured} setErr={setErr} setFeatured={setFeatured} />}
      {expandedEditFeaturedOverview && <ShowEditFeaturedOverview handleEditFeaturedToggle={handleEditFeaturedToggle} featured={featured} handleEditFeaturedItemToggle={handleEditFeaturedItemToggle} setFeatured={setFeatured} setErr={setErr} />}
      {expandedEditFeaturedItem && <ShowEditFeaturedItem featured={featured} expandedEditFeaturedItem={expandedEditFeaturedItem} handleEditFeaturedItemToggle={handleEditFeaturedItemToggle} err={err} setFeatured={setFeatured} setErr={setErr} />}
    </div>
  );
}
