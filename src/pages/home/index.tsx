import Post from "../../components/home/post";
import "./index.css";
import Header from "../../components/header";
import News from "../../components/home/news";
import Advertisement from "../../components/home/advertisement";

export default function Home() {
  return (
    <div>
      <Header />
      <Post />
      <News />
      <Advertisement />

    </div>

  )
}
