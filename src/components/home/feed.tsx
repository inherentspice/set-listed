import React, { useState, useEffect } from "react";
import ProfileService from "../../services/home/profile";
import PostService from "../../services/home/posts";
import { CommentData, PostData, ProfileCardData } from "../../types/profile";
import convertDate from "../../utilities/convert-date";
import Like from "../../media/icons/like.png";
import "../../styles/home/feed.css";
import { AiOutlineEnter } from "react-icons/ai";
import { IconContext } from "react-icons";


export default function Feed(props: {post: PostData, viewingUser: string}) {

  const [profile, setProfile] = useState<ProfileCardData | undefined>(undefined);
  const [comment, setComment] = useState<string>("");
  const [existingComments, setExistingComments] = useState<CommentData[] | null>(null);


  useEffect(() => {
    (async function() {
      try {
        const postUserProfile = await ProfileService.getProfileCard(props.post.user);
        setPostProfile(postUserProfile.data.profileCard[0]);
      } catch (err) {
        console.log(err);
      }
  }());
  }, [props.post.user]);

  useEffect(() => {
    (async function() {
      try {
        const user = await ProfileService.getProfileCard(props.viewingUser);
        setUserProfile(user.data.profileCard[0]);
      } catch (err) {
        console.log(err);
      }
  }());
  }, [props.post.user]);

  useEffect(() => {
    (async function() {
      try {
        const postComments = await PostService.getComments(props.post.id);
        setExistingComments(postComments.data.comments);
      } catch (err) {
        console.log(err);
      }
    }());
  }, []);

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

  async function handleLikeCommentClick(commentId: string, userId: string) {
    try {
      const formObject = {
        user: userId
      };
      const updatedCommentLikes = await PostService.modifyCommentLikes(formObject, commentId);
      console.log(updatedCommentLikes);
    } catch (err) {
      console.log(err);
    }
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setComment(e.target.value);
  }

  async function handleAddCommentSubmit(e: React.MouseEvent<HTMLDivElement, MouseEvent>, comment: string): Promise<void>{
    e.preventDefault();

    const formObject = {
      user: props.viewingUser,
      content: comment,
      post: props.post.id
    }
    try {
      const addComment = await PostService.postComment(formObject);
      const updatedComments = existingComments ? existingComments.concat(addComment.data.comment) : [addComment.data.comment];
      setExistingComments(updatedComments);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteCommentClick(commentId: string) {
    const confirmDelete = confirm("Click OK if you actually want to delete this");
    if (confirmDelete) {
      try {
        await PostService.deleteComment(commentId);
        const updatedComments = existingComments ? existingComments.filter((comm) => comm.id !== commentId) : [];
        setExistingComments(updatedComments);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="home-feed-cont comp">
      <div className="post-cont">
        <div className="home-feed-left">
          <a href={`/user/${props.post.user}`}>
            {profile?.image ?
              <img src={profile.image} alt="" className="profile-picture-medium"/>
              : <></>}
          </a>
        </div>
        <div className="home-feed-right">
          <div className="home-feed-right-top">
            <p>{props.post.content}</p>
          </div>

          <div className="home-feed-right-bottom">
            <div className="profile-feed-info-cont">
              <p className="profile-feed-name">{profile?.firstName} {profile?.lastName}</p>
              <p className="profile-feed-tagline">{profile?.tagline}</p>
              <p className="profile-tag">{convertDate(props.post.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="add-comment-cont">
        <div className="profile-activity-post-likes">
          <img className="profile-activity-post-like-img" onClick={() => handleLikePostClick(props.post.id, props.viewingUser)} src={Like} />
          <div className="profile-activity-post-like-count">{props.post.likes ? props.post.likes.length : 0}</div>
        </div>
        <form className="add-comment-form">
          <input type="text" className="start-comment-area" value={comment} onChange={handleCommentChange} />
          <div onClick={(e) => handleAddCommentSubmit(e, comment)}>
            <IconContext.Provider value={{ size: "1.5rem", className: "message-search-icon"}}>
              <AiOutlineEnter/>
            </IconContext.Provider>
          </div>
        </form>
      </div>
      {existingComments !== null && existingComments.length > 0 && <div className="comment-display">
        {existingComments.map((comm, index) => {
          if (index < 4) {
            return (
              <div className="comment-cont">
                <div className="post-cont comment-info-cont">
                  <a href={`/user/${comm.user.id}`}>
                    <img className="profile-picture-small" src={comm.user.profileCard.image} alt=""/>
                  </a>
                  <div className="comment-user-info">
                    <div className="profile-feed-info-cont">
                      <p className="profile-feed-name">{comm.user.firstName} {comm.user.lastName}</p>
                      <p className="profile-feed-tagline">{comm.user.profileCard.tagline}</p>
                      <p className="profile-tag">{convertDate(comm.createdAt)}</p>
                    </div>
                    <p className="comment-text">{comm.content}</p>
                  </div>
                </div>
                <div className="profile-activity-post-likes comment-likes">
                  <img className="profile-activity-post-like-img" onClick={() => handleLikeCommentClick(comm.id, props.viewingUser)} src={Like} />
                  <div className="profile-activity-post-like-count">{comm.likes ? comm.likes.length : 0}</div>
                  {comm.user.id === props.viewingUser &&
                    <button className="post-edit" onClick={() => handleDeleteCommentClick(comm.id)}>delete</button>}
                </div>
              </div>
            )
          }
        })}
      </div>}
    </div>
  );
}
