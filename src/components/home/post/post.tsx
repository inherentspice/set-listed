import React, { useState } from "react";
import PostService from "../../../services/home/posts";
import ShowStartPost from "./show-start-post";

import "../../../styles/home/post.css";

export default function Post(props: {profileImg: string, user: string}) {
  const [expandedStartPost, setExpandedStartPost] = useState<string>("");

  function handleStartPostClick(id: string): void{
    setExpandedStartPost(id);
  }

  function handleStartPostClose(): void{
    setExpandedStartPost("");
  }

  async function addPost(content: string, user: string): Promise<void>{
    const formData = {
      content,
      user
    };
    try {
      const newPost = await PostService.postPost(formData);
      console.log(newPost);
    } catch (err) {
      console.log(err);
    }
  }


  if (!props.profileImg) {
    return (
      <div className="home-post-cont comp loading-post loading"></div>
    );
  }
  return (
    <div className="home-post-cont comp">
      <div className="post-button-cont">
        <img src={props.profileImg} alt="" className="profile-picture-small"/>
        <button className="start-post-btn" onClick={() => handleStartPostClick(props.user)}>Start a post</button>
      </div>
      {/* <div className="specific-post-cont">
        <button className="post-option-btn">Photo</button>
        <button className="post-option-btn">Video</button>
        <button className="post-option-btn">Sets</button>
        <button className="post-option-btn">Write Article</button>
      </div> */}
    {expandedStartPost &&
      <ShowStartPost
        user={props.user}
        profileImg={props.profileImg}
        handleStartPostClose={handleStartPostClose}
        handleAddPostSubmit={addPost}
      />}
    </div>
  );
}
