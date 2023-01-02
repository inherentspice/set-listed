import { useState } from "react";

export default function Post() {
  return (
    <div className="home-post-cont">
      <div className="post-button-cont">
        <p>X</p>
        <button className="start-post-btn">Start a post</button>
      </div>
      <div className="specific-post-cont">
        <button className="post-option-btn">Photo</button>
        <button className="post-option-btn">Video</button>
        <button className="post-option-btn">Sets</button>
        <button className="post-option-btn">Write Article</button>
      </div>
    </div>
  )
}
