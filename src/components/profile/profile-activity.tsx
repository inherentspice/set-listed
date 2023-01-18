import React from "react";
import "../../styles/profile-activity.css";
import Like from "../../media/icons/like.png";
import Dislike from "../../media/icons/dislike.png";
import { FakeUserData } from "../../dummy-data/fake-users";
import convertDate from "../../utilities/convert-date";


export default function ProfileActivity() {
    return(
        <div className="profile-activity-cont comp">
            <div className="profile-activity-header">
                <div className="profile-activity-header-left">
                    <div className="profile-activity-header-title">Activity</div>
                    <div className="profile-activity-header-followers">{FakeUserData.userFollwers+" followers"}</div>
                </div>
                <div className="profile-activity-header-right">
                    <div className="profile-activity-start-post">Start a Post</div>
                </div>
            </div>
            <div className="profile-activity-posts-cont">
                {FakeUserData.activity.map(item => {
                    return(
                        <div className="profile-activity-post-item">
                        <div className="profile-activity-post-info">
                            <div className="profile-activity-post-author">{FakeUserData.userFirstName+" "+FakeUserData.userLastName}</div>
                            <div className="profile-activity-post-time">{"posted this | "+convertDate(item.date)}</div>
                        </div>
                        <div className="profile-activity-post-description">{item.description}</div>
                        <div className="profile-activity-post">
                            <img className="profile-activity-post-img" src={item.img} />
                            <div className="profile-activity-post-right">
                                <div className="profile-activity-post-title">{item.title}</div>
                                <div className="profile-activity-post-about">
                                    <div className="profile-activity-post-url">{item.url}</div>
                                    <div>|</div>
                                    <div className="profile-activity-post-read-time">{item.read+" read"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-activity-post-likes">
                            <img className="profile-activity-post-like-img" src={Like} />
                            <div className="profile-activity-post-like-count">{item.likes}</div>
                            <img className="profile-activity-post-like-img" src={Dislike} />
                            <div className="profile-activity-post-like-count">{item.dislikes}</div>
                        </div>
                    </div>
    
                    )
                })}
            </div>
            <div className="profile-activity-show-all">Show all activity</div>
        </div>
    )
}