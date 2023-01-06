import Post from "../../components/home/post";
import "./index.css";
import Header from "../../components/header";
import News from "../../components/home/news";
import Advertisement from "../../components/home/advertisement";
import ProfileCard from "../../components/home/profile-card";
import Footer from "../../components/home/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <ProfileCard />
      <Post />
      <News />
      <Advertisement />
      <Footer />

    </div>

  )
}
