import React from "react";
import newsData from "../../dummy-data/news";
import "../../styles/home/news.css";

export default function News(props: {loaded: boolean}) {

  if (!props.loaded) {
    return (
      <div className="home-news-cont comp loading-news loading"></div>
    )
  }

  return (
    <div className="home-news-cont comp">
      <h2>setListed News</h2>
      <ul>
        {newsData.map(news => {
          return (
            <div className="news-list-cont">
              <li key={news.posted.toString()}>{news.title}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
