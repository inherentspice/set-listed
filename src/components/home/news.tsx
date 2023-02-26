import React from "react";
import convertDate from "../../utilities/convert-date";
import "../../styles/home/news.css";

export default function News(props: {loaded: boolean}) {

  if (!props.loaded) {
    return (
      <div className="home-news-cont comp loading-news loading"></div>
    )
  }
  interface newsDataObject {
    title: string,
    posted: Date,
    readCount: number,
  }

  const newsData: newsDataObject[] = [
    {
      title: "What is the deal with...?",
      posted: new Date("December 12, 2022"),
      readCount: 3,
    },
    {
      title: "Welcome to AI assisted comedy",
      posted: new Date("January 2, 2023"),
      readCount: 12,
    },
    {
      title: "Stand-up in the meta-verse",
      posted: new Date("December 27, 2022"),
      readCount: 32,
    },
    {
      title: "Zoom show crowdwork: study",
      posted: new Date("December 29, 2022"),
      readCount: 1,
    },
    {
      title: "What's happening to 'woke' comedy in the UK?",
      posted: new Date("January 3, 2023"),
      readCount: 41
    }
  ];

  // function to convert the date posted to the how long ago it was posted in days or hours


  return (
    <div className="home-news-cont comp">
      <h2>setListed News</h2>
      <ul>
        {newsData.map(news => {
          return (
            <div className="news-list-cont">
              <li key={news.posted.toString()}>{news.title}</li>
              {/* <p>{convertDate(news.posted)} ago | {news.readCount} readers</p> */}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
