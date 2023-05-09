import React, { useState, useEffect } from "react";
import ProfileService from "../../../services/home/profile";
import PostService from "../../../services/home/posts";
import { CommentData, PostData, ProfileCardData } from "../../../types/profile";
import convertDate from "../../../utilities/convert-date";
import Like from "../../../media/icons/like.png";
// import "../../../styles/home/feed.css";
import { AiOutlineEnter } from "react-icons/ai";
import { IconContext } from "react-icons";
import handleLikePostClick from "./like-post";
import handleLikeCommentClick from "./like-comment";
import handleAddCommentSubmit from "./add-comment";
import handleDeleteCommentClick from "./delete-comment";


export default function Feed(props: {post: PostData, viewingUser: string}) {

  const [profile, setProfile] = useState<ProfileCardData | undefined>(undefined);
  const [post, setPost] = useState<PostData>(props.post);
  const [comment, setComment] = useState<string>("");
  const [existingComments, setExistingComments] = useState<CommentData[] | null>(null);
  const [viewCommentIndex, setViewCommentIndex] = useState<number>(3);


  useEffect(() => {
    (async function() {
      try {
        const postUserProfile = await ProfileService.getProfileCard(post.user);
        setProfile(postUserProfile.data.profileCard[0]);
      } catch (err) {
        console.log(err);
      }
  }());
  }, [post.user]);

  useEffect(() => {
    (async function() {
      try {
        const postComments = await PostService.getComments(post.id);
        setExistingComments(postComments.data.comments);
      } catch (err) {
        console.log(err);
      }
    }());
  }, []);

  useEffect(() => {
    if (existingComments) {
      const sortedComments = existingComments.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });
      setExistingComments(sortedComments);
    }
  }, [existingComments])

  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setComment(e.target.value);
  }

  function handleLoadMoreComments(): void{
    if (existingComments) {
      setViewCommentIndex(existingComments.length);
    }
  }

  return (
    <div className="home-feed-cont comp">
      <div className="post-cont">
        <div className="home-feed-content">
        <div className="home-feed-top">
            <div className="home-feed-left">
              <a href={`/user/${post.user}`}>
                {profile?.image ?
                  <img src={profile.image} alt="" className="profile-picture-small"/>
                  : <></>}
              </a>
            </div>
            <div className="profile-feed-post-info">
              <p className="profile-feed-post-name">{profile?.firstName} {profile?.lastName}</p>
              <p className="profile-feed-post-tagline">{profile?.tagline}</p>
            </div>
          </div>
          <div className="home-feed-bottom">
            <p>{post.content}</p>
          </div>
          <p className="profile-feed-post-date">{convertDate(post?.createdAt)}</p>
        </div>
      </div>
      <div className="add-comment-cont">
        <div className="profile-activity-post-likes">
          <img
            className="profile-activity-post-like-img"
            onClick={() => handleLikePostClick(post.id, props.viewingUser, post, setPost)}
            src={Like} />
          <p className="profile-activity-post-like-count">{post.likes ? post.likes.length : 0}</p>
        </div>
        <form className="add-comment-form">
          <input type="text" className="start-comment-area" value={comment} onChange={handleCommentChange} />
          <div onClick={(e) => handleAddCommentSubmit(e, comment, props.viewingUser, post.id, existingComments, setExistingComments, setComment)}>
            <IconContext.Provider value={{ size: "1.5rem", className: "message-search-icon"}}>
              <AiOutlineEnter/>
            </IconContext.Provider>
          </div>
        </form>
      </div>
      {existingComments !== null && existingComments.length > 0 && <div className="comment-display">
        {existingComments.map((comm, index) => {
          if (index < viewCommentIndex) {
            return (
              <div className="comment-cont">
                <div className="post-cont comment-info-cont">
                  <div className="comment-user-info">
                    <div className="profile-feed-info-cont">
                      <a href={`/user/${comm.user.id}`}>
                        <img className="profile-picture-small" src={comm.user.profileCard.image} alt=""/>
                      </a>
                      <div className="profile-feed-comment-info">
                        <p className="profile-feed-name">{comm.user.firstName} {comm.user.lastName}</p>
                        <p className="profile-feed-post-tagline">{comm.user.profileCard.tagline}</p>
                      </div>
                    </div>
                    <p className="comment-text">{comm.content}</p>
                    <div className="comment-footer">
                      <div className="profile-activity-post-likes comment-likes">
                        <img
                          className="profile-activity-post-like-img"
                          onClick={() => handleLikeCommentClick(comm.id, props.viewingUser, existingComments, setExistingComments)}
                          src={Like}
                        />
                        <p className="profile-activity-post-like-count">{comm.likes ? comm.likes.length : 0}</p>
                        {comm.user.id === props.viewingUser &&
                          <button
                            className="post-edit"
                            onClick={() => handleDeleteCommentClick(comm.id, existingComments, setExistingComments)}
                          >delete</button>}
                      </div>

                      <p className="profile-tag">{convertDate(comm.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
        {existingComments.length > viewCommentIndex && <button className="post-edit" onClick={() => handleLoadMoreComments()}>Load more comments...</button>}
      </div>}
    </div>
  );
}
