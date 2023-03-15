import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../../styles/profiles/profile-activity.css";
import convertDate from "../../../utilities/convert-date";
import { ProfileCardData, PostData } from "../../../types/profile";
import PostService from "../../../services/home/posts";
import ErrorMessage from "../../error-message";
import ShowStartPost from "./Show-Start-Post";
import ShowEditPost from "./Show-Edit-Post";

export default function ProfileActivity(props: {profileCard: ProfileCardData[], posts: PostData[], viewingUser: string, userProfile: boolean}) {
    const [expandedStartPost, setExpandedStartPost] = useState<boolean>(false);
    const [expandedEditPost, setExpandedEditPost] = useState<string>("");
    const [err, setErr] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostData[]>(props.posts);

    const profileCard = props.profileCard[0];

    useEffect(() => {
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }, [err]);

    function handleStartPostToggle(): void{
        setExpandedStartPost(!expandedStartPost);
      }

    function handleEditPostToggle(id: string): void{
        setExpandedEditPost(expandedEditPost == "" ? id : "");
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
        handleStartPostToggle();
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
        handleEditPostToggle(id);
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



    return(
      <div className="profile-activity-cont comp">
        <div className="profile-section-header">
          <div className="profile-activity-header-left">
            <div className="profile-activity-header-title">Activity</div>
            <div className="profile-activity-header-followers">{profileCard.userProfileViews+" followers"}</div>
          </div>
          <div className="profile-activity-header-right">
            {props.userProfile && <div className="secondary-button" onClick={() => handleStartPostToggle()}>Start a Post</div>}
          </div>
        </div>
        <div className="profile-activity-posts-cont">
          {posts.length <=0 ? <p>You haven't posted any content yet you lazy bum.</p> : posts && posts.map(item => {
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
                  {props.userProfile && <button className="post-edit" onClick={() => handleEditPostToggle(item.id)}>edit</button>}
                  {props.userProfile && <button className="post-edit" onClick={(e) => handleDeletePostClick(e, item.id)}>delete</button>}
                </div>
              </div>
              );
            })}
        </div>
        <div className="profile-activity-show-all">Show All Activity</div>
        {expandedStartPost && <ShowStartPost profileCard={props.profileCard} handleStartPostToggle={handleStartPostToggle} handleAddPostSubmit={handleAddPostSubmit} err={err}/>}
        {expandedEditPost && <ShowEditPost profileCard={props.profileCard} posts={posts} expandedEditPost={expandedEditPost} handleEditPostToggle={handleEditPostToggle} handleEditPostSubmit={handleEditPostSubmit} err={err}/>}
        {err && <ErrorMessage/>}
      </div>
    );
}
