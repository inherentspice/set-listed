import React, { useState } from "react";
import ReactDOM from "react-dom";
import PostService from "../../services/home/posts";
import CancelButton from "../../media/icons/cancel.png";
import Emoji from "../../media/icons/emoji.png";
import Picture from "../../media/icons/picture.png";
import Video from "../../media/icons/video.png";
import Document from "../../media/icons/document.png";
import Chart from "../../media/icons/chart.png";
import Visibility from "../../media/icons/visibility.png";
import Comments from "../../media/icons/comments.png";
import "../../styles/home/post.css";

export default function Post(props: {profileImg: string | undefined, user: string}) {
  const [expandedStartPost, setExpandedStartPost] = useState<string>("");

  function handleStartPostClick(id: string): void{
    setExpandedStartPost(id);
  }

  function handleStartPostClose(): void{
    setExpandedStartPost("");
  }

  function handleAddPostSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string
  ) {
    e.preventDefault();
    addPost(content, props.user)
      .then(() => {
        console.log("post added");
      }).catch((err) => {
        console.log(err);
      });
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

  function ShowStartPost() {
    const [content, setContent] = useState<string>("");

    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>): void{
      setContent(e.target.value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={props.user} onClick={() => handleStartPostClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-start-post-title">Edit Your About Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleStartPostClose()} />
          </div>
          <form className="start-post-user-form">
              <div className="start-post-user-cont">
                <img className="profile-picture-small" src={props.profileImg} />
                <img src={Visibility}/>
                <select className="start-post-visibility">
                    <option value="public">Public</option>
                    <option value="connections">Connections Only</option>
                    <option value="innercircle">Inner Circle Only</option>
                    <option value="private">Only Me</option>
                </select>
              </div>
              <textarea className="start-post-textarea" placeholder="What is on your mind?" rows={10} value={content} onChange={handleContentChange}/>
              <div className="start-post-emoji-hashtag-cont">
                <button className="hidden-btn" title="Add Emoji"><img className="start-post-add-emoji" src={Emoji}></img></button>
                <div className="start-post-add-hashtag">Add Hashtag</div>
              </div>
              <div className="start-post-foot">
                <div className="start-post-foot-multimedia-cont">
                  <button className="hidden-btn" title="Add Picture"><img className="start-post-foot-multimedia-item" src={Picture} /></button>
                  <button className="hidden-btn" title="Add Video"><img className="start-post-foot-multimedia-item" src={Video} /></button>
                  <button className="hidden-btn" title="Add Document"><img className="start-post-foot-multimedia-item" src={Document} /></button>
                  <button className="hidden-btn" title="Add Poll"><img className="start-post-foot-multimedia-item" src={Chart} /></button>
                </div>
                <div className="start-post-foot-submit-cont">
                  <img src={Comments}/>
                  <select>
                    <option value="public">Public</option>
                    <option value="connections">Connections</option>
                    <option value="innercircle">Inner Circle</option>
                    <option value="noone">Disable</option>
                  </select>
                  <button type="submit" onClick={(e) => {handleAddPostSubmit(e, content);}}>Post</button>
                </div>
              </div>
            </form>
          </div>
        </>,
        document.body
      );
    }

  return (
    <div className="home-post-cont comp">
      <div className="post-button-cont">
        <img src={props.profileImg} alt="" className="profile-picture-small"/>
        <button className="start-post-btn" onClick={() => handleStartPostClick(props.user)}>Start a post</button>
      </div>
      <div className="specific-post-cont">
        <button className="post-option-btn">Photo</button>
        <button className="post-option-btn">Video</button>
        <button className="post-option-btn">Sets</button>
        <button className="post-option-btn">Write Article</button>
      </div>
    {expandedStartPost && <ShowStartPost />}
    </div>
  );
}
