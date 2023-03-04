import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../../styles/profiles/profile-activity.css";
import convertDate from "../../utilities/convert-date";
import CancelButton from "../../media/icons/cancel.png";
import Emoji from "../../media/icons/emoji.png";
import Picture from "../../media/icons/picture.png";
import Video from "../../media/icons/video.png";
import Document from "../../media/icons/document.png";
import Chart from "../../media/icons/chart.png";
import Visibility from "../../media/icons/visibility.png";
import Comments from "../../media/icons/comments.png";
import { ProfileCardData, PostData } from "../../types/profile";
import PostService from "../../services/home/posts";
import ErrorMessage from "../error-message";

export default function ProfileActivity(props: {profileCard: ProfileCardData[], posts: PostData[], viewingUser: string, userProfile: boolean}) {
    const [expandedStartPost, setExpandedStartPost] = useState<string>("");
    const [expandedEditPost, setExpandedEditPost] = useState<string>("");
    const [err, setErr] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostData[]>(props.posts);

    const profileCard = props.profileCard[0];

    useEffect(() => {
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }, [err]);

    function handleStartPostClick(id: string): void{
        setExpandedStartPost(id);
      }

    function handleStartPostClose(): void{
      setExpandedStartPost("");
    }

    function handleEditPostClick(id: string): void{
      setExpandedEditPost(id);
    }

    function handleEditPostClose(): void{
      setExpandedEditPost("");
    }

    function handleAddPostSubmit(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      content: string
    ) {
      e.preventDefault();
      addPost(content, profileCard.user)
        .then(() => {
          console.log("post added");
        });
    }

    async function addPost(content: string, user: string): Promise<void>{
      const formData = {
        content,
        user
      };
      try {
        const newPost = await PostService.postPost(formData);
        const newPosts = posts.concat(newPost.data.post);
        setPosts(newPosts);
        handleStartPostClose();
      } catch (err) {
        setErr(true);
      }
    }

    function handleEditPostSubmit(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      content: string,
      id: string
    ) {
      e.preventDefault();
      addPostEdit(content, id)
        .then(() => {
          console.log("post edited");
        });
    }

    async function addPostEdit(content: string, id: string) {
      const formData = {
        content
      };
      try {
        const editedPost = await PostService.editPost(formData, id);
        const updatedPosts = posts.map((post) => {
          if (post.id === editedPost.data.post.id) {
            return editedPost.data.post;
          } else {
            return post;
          }
        });
        setPosts(updatedPosts);
        handleEditPostClose();
      } catch (err) {
        setErr(true);
      }
    }

    function handleDeletePostClick(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: string
    ) {
      e.preventDefault();
      const confirmDelete = confirm("Click OK if you actually want to delete this");
      if (confirmDelete) {
        deletePost(id)
          .then(() => {
            console.log("post deleted");
          });
      }
    }

    async function deletePost(id: string) {
      try {
        await PostService.deletePost(id);
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
      } catch (err) {
        setErr(true);
      }
    }

    function handleLikePostClick(id: string, viewingUser: string) {
      likePost(id, viewingUser)
        .then(() => {
          console.log("post liked!");
        }).catch((err) => {
          console.log(err);
        });
    }

    async function likePost(id: string, viewingUser: string) {
      try {
        const formObject = {
          user: viewingUser
        };
        const updatedLikes = await PostService.modifyPostLikes(formObject, id);
        console.log(updatedLikes);

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
          <div className="expanded-profile-overlay-cont" key={profileCard.id} onClick={() => handleStartPostClose()}></div>
          <div className="expanded-profile-overlay">
            <div className="expanded-profile-overlay-header-cont">
              <h2 className="expanded-profile-overlay-header-title">Write Your Post Below</h2>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleStartPostClose()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
            </div>
            <form className="start-post-user-form">
                <div className="start-post-user-cont">
                  <img className="profile-picture-small" src={profileCard.image} />
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="add-post-visibility-img"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>
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
                  <button className="hidden-btn start-post-add-hashtag" title="Add Hashtag">Add Hashtag</button>
                </div>
                <div className="start-post-foot">
                  <div className="start-post-foot-multimedia-cont">
                    <button className="hidden-btn" title="Add Picture"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="start-post-foot-multimedia-item"><path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm56-97h489L578 583 446 754l-93-127-117 152Zm-56 97V276v600Z"/></svg></button>
                    <button className="hidden-btn" title="Add Video"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="start-post-foot-multimedia-item"><path d="m140 256 74 152h130l-74-152h89l74 152h130l-74-152h89l74 152h130l-74-152h112q24 0 42 18t18 42v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42V316q0-24 18-42t42-18Zm0 212v368h680V468H140Zm0 0v368-368Z"/></svg></button>
                    <button className="hidden-btn" title="Add Document"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="start-post-foot-multimedia-item"><path d="M319 806h322v-60H319v60Zm0-170h322v-60H319v60Zm-99 340q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/></svg></button>
                    <button className="hidden-btn" title="Add Poll"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="start-post-foot-multimedia-item"><path d="M160 896V456h140v440H160Zm250 0V256h140v640H410Zm250 0V616h140v280H660Z"/></svg></button>
                  </div>
                  <div className="start-post-foot-submit-cont">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="start-post-foot-img"><path d="M80 776V218q0-14 13-28t27-14h519q15 0 28 13.5t13 28.5v356q0 14-13 28t-28 14H240L80 776Zm201 40q-14 0-27.5-14T240 774v-98h500V336h100q14 0 27 14t13 29v596L721 816H281Zm339-580H140v395l75-75h405V236Zm-480 0v395-395Z"/></svg>
                    <select >
                      <option value="public">Public</option>
                      <option value="connections">Connections</option>
                      <option value="innercircle">Inner Circle</option>
                      <option value="noone">Disable</option>
                    </select>
                    <button type="submit" onClick={(e) => {handleAddPostSubmit(e, content);}} className="secondary-button">Post</button>
                  </div>
                </div>
              </form>
              {err && <ErrorMessage/>}
            </div>
          </>,
          document.body
        );
      }
    function ShowEditPost() {
      const selectedPost = posts.filter((post) => post.id === expandedEditPost)[0];
      const [content, setContent] = useState<string>(selectedPost.content);

      function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>): void{
        setContent(e.target.value);
      }

      return ReactDOM.createPortal(
        <>
          <div className="expanded-profile-overlay-cont" key={selectedPost.id} onClick={() => handleEditPostClose()}></div>
          <div className="expanded-profile-overlay">
            <div className="expanded-profile-overlay-header-cont">
              <h2 className="expanded-profile-overlay-header-title">Edit Your Post Below</h2>
              <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditPostClose()} />
            </div>
            <form className="start-post-user-form">
                <div className="start-post-user-cont">
                  <img className="profile-picture-small" src={profileCard.image} />
                  <img src={Visibility}/>
                  <select className="start-post-visibility">
                      <option value="public">Public</option>
                      <option value="connections">Connections Only</option>
                      <option value="innercircle">Inner Circle Only</option>
                      <option value="private">Only Me</option>
                  </select>
                </div>
                <textarea className="start-post-textarea" rows={10} value={content} onChange={handleContentChange}/>
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
                    <button type="submit" onClick={(e) => {handleEditPostSubmit(e, content, selectedPost.id);}}>Save Edits</button>
                  </div>
                </div>
              </form>
              {err && <ErrorMessage/>}
            </div>
          </>,
          document.body
        );
    }

    return(
      <div className="profile-activity-cont comp">
        <div className="profile-section-header">
          <div className="profile-activity-header-left">
            <div className="profile-activity-header-title">Activity</div>
            <div className="profile-activity-header-followers">{profileCard.userProfileViews+" followers"}</div>
          </div>
          <div className="profile-activity-header-right">
            {props.userProfile && <div className="secondary-button" onClick={() => handleStartPostClick(profileCard.id)}>Start a Post</div>}
          </div>
        </div>
        <div className="profile-activity-posts-cont">
          {posts.length <=0 ? <p>You haven't posted any content yet you lazy bum.</p> : posts && posts.slice(0).reverse().map(item => {
            return(
              <div className="profile-activity-post-item" key={item.id}>
                <div className="profile-activity-post-info">
                  <div className="profile-activity-post-author">{profileCard.firstName+" "+profileCard.lastName}</div>
                  <div className="profile-activity-post-time">{"posted this | "+convertDate(item.createdAt)}</div>
                </div>
                <p className="profile-activity-post-description">{item.content}</p>
                <div className="profile-activity-post-likes">
                  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-activity-post-like-img" onClick={() => handleLikePostClick(item.id, props.viewingUser)}><path d="M716 936H272V424l278-288 39 31q6 5 9 14t3 22v10l-45 211h299q24 0 42 18t18 42v81.839q0 7.161 1.5 14.661T915 595L789 885q-8.878 21.25-29.595 36.125Q738.689 936 716 936Zm-384-60h397l126-299v-93H482l53-249-203 214v427Zm0-427v427-427Zm-60-25v60H139v392h133v60H79V424h193Z"/></svg>
                  <div className="profile-activity-post-like-count">{item.likes ? item.likes.length : 0}</div>
                  {props.userProfile && <button className="post-edit" onClick={() => handleEditPostClick(item.id)}>edit</button>}
                  {props.userProfile && <button className="post-edit" onClick={(e) => handleDeletePostClick(e, item.id)}>delete</button>}
                </div>
              </div>
              );
            })}
        </div>
        <div className="profile-activity-show-all">Show All Activity</div>
        {expandedStartPost && <ShowStartPost />}
        {expandedEditPost && <ShowEditPost />}
        {err && <ErrorMessage/>}
      </div>
    );
}
