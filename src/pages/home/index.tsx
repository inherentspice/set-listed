import React, { useEffect, useState } from "react";
import Post from "../../components/home/post/post";
// import "./index.css";
import News from "../../components/home/news";
import Advertisement from "../../components/home/advertisement";
import ProfileCard from "../../components/home/profile-card/profile-card";
import Footer from "../../components/home/footer";
import QuickAccess from "../../components/home/quick-access";
import Feed from "../../components/home/feed/feed";
import { ProfileCardData, PostData } from "../../types/profile";
import PostService from "../../services/home/posts";
import ProfileService from "../../services/home/profile";
import { useUserId } from "../../context/userIdContext";

export default function Home() {
  const [profile, setProfile] = useState<ProfileCardData | undefined>(undefined);
  const [posts, setPosts] = useState<PostData[] | undefined>(undefined);
  const { userId } = useUserId();


  useEffect(() => {
    async function getFeed() {
      try {
        const getPosts = await PostService.getFeed(userId);
        const getProfile = await ProfileService.getProfileCard(userId);
        setPosts(getPosts.data.posts);
        setProfile(getProfile.data.profileCard[0]);
      } catch (err) {
        console.log("error");
      }
    }

    if (userId) {
      getFeed();
    }

  }, [userId]);

  if (!profile) {
    return (
      <div className="page-cont">
        <div className="home">
          <div className="home-left">
            <ProfileCard profile={null}/>
            <QuickAccess loaded={false}/>
          </div>
          <div className="home-center">
            <Post profileImg={""} user={userId} />
            <div className="home-feed">
              {posts && Array.from(posts).map(post => {
                return <Feed viewingUser={userId} post={post} key={post.id}/>;
              })}
            </div>
          </div>
          <div className="home-right">
            <News loaded={false}/>
            <div className="ad-footer-cont">
              <Advertisement profileImg={""} />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-cont">
      <div className="home">
        <div className="home-left">
          {profile && <ProfileCard profile={profile}/>}
          {!profile && <ProfileCard profile={null}/>}
          <QuickAccess loaded={true}/>
        </div>
        <div className="home-center">
          {profile && <Post profileImg={profile.image} user={userId}/>}
          {!profile && <Post profileImg={""} user={userId} />}

          <div className="home-center-divider"></div>

          <div className="home-feed">
            {posts && Array.from(posts).map(post => {
              return <Feed viewingUser={userId} post={post} key={post.id}/>;
            })}
          </div>
        </div>
        <div className="home-right">
          <News loaded={true}/>
          <div className="ad-footer-cont">
            {profile && <Advertisement profileImg={profile.image}/>}
            {!profile && <Advertisement profileImg={""} />}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
