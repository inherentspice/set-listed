import React from "react";
import Post from "../../components/home/post";
import "./index.css";
import News from "../../components/home/news";
import Advertisement from "../../components/home/advertisement";
import ProfileCard from "../../components/home/profile-card";
import Footer from "../../components/home/footer";
import QuickAccess from "../../components/home/quick-access";
import Feed from "../../components/home/feed";
import FeedData from "../../dummy-data/feed";


export default function Home() {
  return (
    <div className="page-cont">
      <div className="home">
        <ProfileCard />
        <QuickAccess />
        <Post />
        {FeedData.map(post => {
          return <Feed postData={post} key={post.posted.toString()}/>
        })}
        <News />
        <div className="ad-footer-cont">
          <Advertisement />
          <Footer />
        </div>
      </div>
    </div>
  )
}
