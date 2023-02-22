import React, { useEffect, useState } from "react";
import Post from "../../components/home/post";
import "./index.css";
import News from "../../components/home/news";
import Advertisement from "../../components/home/advertisement";
import ProfileCard from "../../components/home/profile-card";
import Footer from "../../components/home/footer";
import QuickAccess from "../../components/home/quick-access";
import Feed from "../../components/home/feed";
import { ProfileCardData, PostData } from "../../types/profile";
import AuthService from "../../services/home/auth";
import PostService from "../../services/home/posts";
import ProfileService from "../../services/home/profile";

export default function Home() {
  const [profile, setProfile] = useState<ProfileCardData | undefined>(undefined);
  const [posts, setPosts] = useState<PostData[] | undefined>(undefined);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    (async function() {
      try {
        const userAuth = await AuthService.checkSession();
        const getPosts = await PostService.getFeed(userAuth.data.user);
        const getProfile = await ProfileService.getProfileCard(userAuth.data.user);
        setUser(userAuth.data.user);
        setPosts(getPosts.data.posts);
        setProfile(getProfile.data.profileCard[0]);
      } catch (err) {
        console.log("error");
      }
    }());
  }, []);

  return (
    <div className="page-cont">
      <div className="home">
        {profile && <ProfileCard profile={profile}/>}
        <QuickAccess />
        {profile && <Post profileImg={profile.image} user={user}/>}
        {posts && Array.from(posts).map(post => {
          return <Feed viewingUser={user} post={post} key={post.id}/>;
        })}
        <News />
        <div className="ad-footer-cont">
          {profile && <Advertisement profileImg={profile.image}/>}
          <Footer />
        </div>
      </div>
    </div>
  );
}
