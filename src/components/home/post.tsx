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

export default function Post(props: {profileImg: string, user: string}) {
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
        handleStartPostClose();
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
            <h2 className="expanded-profile-overlay-header-title">Write Your Post Below</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleStartPostClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
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

                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="add-post-visibility-img"><path d="M80 776V218q0-14 13-28t27-14h519q15 0 28 13.5t13 28.5v356q0 14-13 28t-28 14H240L80 776Zm201 40q-14 0-27.5-14T240 774v-98h500V336h100q14 0 27 14t13 29v596L721 816H281Zm339-580H140v395l75-75h405V236Zm-480 0v395-395Z"/></svg>
                <select >
                  <option value="public">Public</option>
                  <option value="connections">Connections</option>
                  <option value="innercircle">Inner Circle</option>
                  <option value="noone">Disable</option>
                </select>

              </div>
              <textarea className="start-post-textarea" placeholder="What is on your mind?" rows={10} value={content} onChange={handleContentChange} maxLength={140}/>
              <div className="start-post-emoji-hashtag-cont">
                <button className="hidden-btn" title="Add Emoji"><img className="start-post-add-emoji" src={Emoji}></img></button>
                <div className="start-post-add-hashtag">Add Hashtag</div>
                <div>Character Limit: {content.length}/140</div>
              </div>
              <div className="expanded-profile-overlay-submit">
                <button type="submit" onClick={(e) => {handleAddPostSubmit(e, content);}} className="secondary-button">Post</button>
              </div>
            </form>
          </div>
        </>,
        document.body
      );
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
    {expandedStartPost && <ShowStartPost />}
    </div>
  );
}
