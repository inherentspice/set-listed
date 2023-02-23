import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../styles/profile-activity.css";
import Like from "../../media/icons/like.png";
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

export default function ProfileActivity(props: {profileCard: ProfileCardData[], posts: PostData[], viewingUser: string, userProfile: boolean}) {
    const [expandedStartPost, setExpandedStartPost] = useState<string>("");
    const [expandedEditPost, setExpandedEditPost] = useState<string>("");
    const posts = props.posts;

    const profileCard = props.profileCard[0];

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

    function handleEditPostSubmit(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      content: string,
      id: string
    ) {
      e.preventDefault();
      addPostEdit(content, id)
        .then(() => {
          console.log("post edited");
        }).catch((err) => {
          console.log(err);
        });
    }

    async function addPostEdit(content: string, id: string) {
      const formData = {
        content
      };
      try {
        const editedPost = await PostService.editPost(formData, id);
        console.log(editedPost);
      } catch (err) {
        console.log(err);
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
          }).catch((err) => {
            console.log(err);
          });
      }
    }

    async function deletePost(id: string) {
      try {
        const deletedConfirmation = await PostService.deletePost(id);
        console.log(deletedConfirmation);
      } catch (err) {
        console.log(err);
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
              <h2 className="expanded-start-post-title">Edit Your About Section</h2>
              <img className="start-post-cancel" src={CancelButton} onClick={() => handleStartPostClose()} />
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
              <h2 className="expanded-start-post-title">Edit Your About Section</h2>
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
            </div>
          </>,
          document.body
        );
    }

    return(
      <div className="profile-activity-cont comp">
        <div className="profile-activity-header">
          <div className="profile-activity-header-left">
            <div className="profile-activity-header-title">Activity</div>
            <div className="profile-activity-header-followers">{profileCard.userProfileViews+" followers"}</div>
          </div>
          <div className="profile-activity-header-right">
            {props.userProfile && <div className="profile-activity-start-post" onClick={() => handleStartPostClick(profileCard.id)}>Start a Post</div>}
          </div>
        </div>
        <div className="profile-activity-posts-cont">
          {posts && posts.map(item => {
            return(
              <div className="profile-activity-post-item" key={item.id}>
                <div className="profile-activity-post-info">
                  <div className="profile-activity-post-author">{profileCard.firstName+" "+profileCard.lastName}</div>
                  <div className="profile-activity-post-time">{"posted this | "+convertDate(item.createdAt)}</div>
                </div>
                <p className="profile-activity-post-description">{item.content}</p>
                <div className="profile-activity-post-likes">
                  <img className="profile-activity-post-like-img" onClick={() => handleLikePostClick(item.id, props.viewingUser)} src={Like} />
                  <div className="profile-activity-post-like-count">{item.likes ? item.likes.length : 0}</div>
                  {props.userProfile && <button className="post-edit" onClick={() => handleEditPostClick(item.id)}>edit</button>}
                  {props.userProfile && <button className="post-edit" onClick={(e) => handleDeletePostClick(e, item.id)}>delete</button>}
                </div>
              </div>
              );
            })}
        </div>
        <div className="profile-activity-show-all">Show all activity</div>
        {expandedStartPost && <ShowStartPost />}
        {expandedEditPost && <ShowEditPost />}
      </div>
    );
}
