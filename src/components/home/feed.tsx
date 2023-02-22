import React, { useState, useEffect } from "react";
import ProfileService from "../../services/home/profile";
import PostService from "../../services/home/posts";
import { PostData, ProfileCardData } from "../../types/profile";
import convertDate from "../../utilities/convert-date";
import Like from "../../media/icons/like.png";


export default function Feed(props: {post: PostData, viewingUser: string}) {

  const [profile, setProfile] = useState<ProfileCardData | undefined>(undefined);

  useEffect(() => {
    (async function() {
      try {
        const userProfile = await ProfileService.getProfileCard(props.post.user);
        setProfile(userProfile.data.profileCard[0]);
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

  return (
    <div className="home-feed-cont comp">
      <div className="profile-info-cont">
        <a href={`/user/${props.post.user}`}>
        {profile?.image ?
          <img src={profile.image} alt="" className="profile-picture-small"/>
          : <></>}
        </a>
        <div className="profile-text-info-cont">
          <p className="profile-name">{profile?.firstName} {profile?.lastName}</p>
          <p className="profile-tag">{profile?.tagline}</p>
          <p className="profile-tag">{convertDate(props.post.createdAt)}</p>
        </div>
      </div>
      <p>{props.post.content}</p>
      <div className="profile-activity-post-likes">
        <img className="profile-activity-post-like-img" onClick={() => handleLikePostClick(props.post.id, props.viewingUser)} src={Like} />
        <div className="profile-activity-post-like-count">{props.post.likes ? props.post.likes.length : 0}</div>
      </div>
    </div>
  );
}
