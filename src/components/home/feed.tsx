import React, { useState, useEffect } from "react";
import ProfileService from "../../services/home/profile";
import PostService from "../../services/home/posts";
import { PostData, ProfileCardData } from "../../types/profile";
import convertDate from "../../utilities/convert-date";
import Like from "../../media/icons/like.png";
import "../../styles/home/feed.css";
import ChatBubble from "../../media/icons/chat-bubble.png";


export default function Feed(props: {post: PostData, viewingUser: string}) {

  const [profile, setProfile] = useState<ProfileCardData | undefined>(undefined);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    (async function() {
      try {
        const userProfile = await ProfileService.getProfileCard(props.post.user);
        setProfile(userProfile.data.profileCard[0]);
      } catch (err) {
        console.log(err);
      }
  }());
  }, [props.post.user]);

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

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>): void{
    setComment(e.target.value);
  }

  function handleAddCommentSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, comment: string) {
    e.preventDefault();

    console.log(comment);
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
          <textarea className="start-comment-area" value={comment} onChange={handleCommentChange} />
          <button className="primary-button comment-button" type="submit" onClick={(e) => handleAddCommentSubmit(e, comment)}>Comment</button>
        </form>
      </div>
    </div>
  );
}
