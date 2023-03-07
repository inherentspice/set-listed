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

  async function handleLikePostClick(id: string, viewingUser: string) {
    try {
      console.log("here");
      const formObject = {
        user: viewingUser
      };
      await PostService.modifyPostLikes(formObject, id);
      const isLiked = post.likes.indexOf(viewingUser);
      if (isLiked !== -1) {
        const updatedPost = {...post};
        updatedPost.likes.splice(isLiked, 1);
        setPost(updatedPost);
      } else {
        const updatedPost = {...post};
        updatedPost.likes.push(viewingUser);
        setPost(updatedPost);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLikeCommentClick(commentId: string, userId: string) {
    try {
      const formObject = {
        user: userId
      };
      await PostService.modifyCommentLikes(formObject, commentId);
      if (existingComments) {
        const initialCommentInfo = existingComments.filter((comm) => comm.id === commentId);
        const isLiking = initialCommentInfo[0].likes.indexOf(userId);
        isLiking === -1 ?
          initialCommentInfo[0].likes.push(userId) :
          initialCommentInfo[0].likes.splice(isLiking, 1);
        const updatedLikesArray = existingComments
          .filter((comm) => comm.id !== commentId)
          .concat(initialCommentInfo);
        setExistingComments(updatedLikesArray)
        }
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
      post: post.id
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

  async function handleDeleteCommentClick(commentId: string): Promise<void>{
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

  function handleLoadMoreComments(): void{
    if (existingComments) {
      setViewCommentIndex(existingComments.length);
    }
  }

  return (
    <div className="home-feed-cont comp">
      <div className="post-cont">
        <div className="home-feed-left">
          <a href={`/user/${post.user}`}>
            {profile?.image ?
              <img src={profile.image} alt="" className="profile-picture-medium"/>
              : <></>}
          </a>
        </div>
        <div className="home-feed-right">
          <div className="home-feed-right-top">
            <p>{post.content}</p>
          </div>

          <div className="home-feed-right-bottom">
            <div className="profile-feed-info-cont">
              <p className="profile-feed-name">{profile?.firstName} {profile?.lastName}</p>
              <p className="profile-feed-tagline">{profile?.tagline}</p>
              <p className="profile-tag">{convertDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="add-comment-cont">
        <div className="profile-activity-post-likes">
          <img className="profile-activity-post-like-img" onClick={() => handleLikePostClick(post.id, props.viewingUser)} src={Like} />
          <div className="profile-activity-post-like-count">{post.likes ? post.likes.length : 0}</div>
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
          if (index < viewCommentIndex) {
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
        {existingComments.length > viewCommentIndex && <button className="post-edit" onClick={() => handleLoadMoreComments()}>Load more comments...</button>}
      </div>}
    </div>
  );
}
