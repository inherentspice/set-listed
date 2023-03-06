import React, { useState, useEffect } from "react";
import ProfileService from "../../services/home/profile";
import PostService from "../../services/home/posts";
import { PostData, ProfileCardData } from "../../types/profile";
import convertDate from "../../utilities/convert-date";
import Like from "../../media/icons/like.png";
import "../../styles/home/feed.css";
import ChatBubble from "../../media/icons/chat-bubble.png";


export default function Feed(props: {post: PostData, viewingUser: string}) {

  const [postProfile, setPostProfile] = useState<ProfileCardData | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<ProfileCardData | undefined>(undefined);

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

  return (
    <div className="home-feed-cont comp">
      <div className="home-feed-main-cont">
      <div className="home-feed-left">
        <div className="profile-activity-post-likes">
          <img className="profile-activity-post-like-img" onClick={() => handleLikePostClick(props.post.id, props.viewingUser)} src={Like} />
          <div className="profile-activity-post-like-count">{props.post.likes ? props.post.likes.length : 0}</div>
        </div>
        <a href={`/user/${props.post.user}`}>
          {postProfile?.image ?
            <img src={postProfile.image} alt="" className="profile-picture-medium"/>
            : <></>}
        </a>
      </div>

      <div className="home-feed-right">
        <div className="home-feed-right-top">
          <img src={ChatBubble} className="home-feed-chat-bubble" />
          <p>{props.post.content}</p>
        </div>

        <div className="home-feed-right-bottom">
          <div className="profile-feed-info-cont">
            <p className="profile-feed-name">{postProfile?.firstName} {postProfile?.lastName}</p>
            <p className="profile-feed-tagline">{postProfile?.tagline}</p>
            <p className="profile-tag">{convertDate(props.post.createdAt)}</p>
          </div>
        </div>
      </div> 

      </div>

      <div className="home-feed-comment-conts">
        <div className="user-comment-cont">
          <img src={userProfile?.image} className="profile-picture-small" />
          <textarea/>
          <button className="heckle-button">Heckle</button>
        </div>
        <div className="home-feed-comments">comments here</div>
      </div>
    </div>
  );
}
