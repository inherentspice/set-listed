import React from "react";
import Hashtag from "../../media/icons/hashtag.png";
import Group from "../../media/icons/group.png";
import Event from "../../media/icons/event.png";
import { FakeUserData } from "../../dummy-data/fake-users";
// import "../../styles/home/quick-access.css";

export default function QuickAccess(props: {loaded: boolean}){
  if (!props.loaded) {
    return (
      <div className="quick-access-cont comp loading-quick loading"></div>
    );
  }
  return(
    <div className="quick-access-cont comp">
      <div className="quick-access-category-cont">
        <h2 className="quick-access-title">Trending Now</h2>
        <div className="quick-access-item-cont">
          <img className="quick-access-item-icon" src={Hashtag} alt=""/>
          <p className="quick-access-item">Bill Burr</p>
        </div>
      </div>

      <div className="quick-access-category-cont">
        <h2 className="quick-access-title">Groups</h2>
        <div>
          {FakeUserData[0].groups.map(item => {
            return (
              <div className="quick-access-item-cont" key={item.id}>
                <img className="quick-access-item-icon" src={Group} alt=""/>
                <a className="quick-access-item" href={item.url}>{item.name}</a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="quick-access-category-cont">
        <h2 className="quick-access-title">Upcoming Events</h2>
        <div>
          {FakeUserData[0].events.map(item => {
            return (
              <div className="quick-access-item-cont" key={item.id}>
                <img className="quick-access-item-icon" src={Event} alt=""/>
                <a href={item.url} className="quick-access-item">{item.name}</a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="quick-access-category-cont">
        <h2 className="quick-access-title">My Hashtags</h2>
        <div>
          {FakeUserData[0].hashtags.map(item => {
            return (
              <div className="quick-access-item-cont" key={item.id}>
                <img className="quick-access-item-icon" src={Hashtag} alt=""/>
                <a className="quick-access-item" href={item.url}>{item.name}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
