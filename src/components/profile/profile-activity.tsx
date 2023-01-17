import React from "react";
import "../../styles/profile-activity.css";
import Like from "../../media/icons/like.png";
import BillBurr from "../../media/profile/billburr.png";

export default function ProfileActivity() {
    return(
        <div className="profile-activity-cont comp">
            <div className="profile-activity-header">
                <div className="profile-activity-header-left">
                    <div className="profile-activity-header-title">Activity</div>
                    <div className="profile-activity-header-followers">5,865 followers</div>
                </div>
                <div className="profile-activity-header-right">
                    <div className="profile-activity-start-post">Start a Post</div>
                </div>
            </div>
            <div className="profile-activity-posts-cont">
                <div className="profile-activity-post-item">
                    <div className="profile-activity-post-info">
                        <div className="profile-activity-post-author">Ben Dover posted this</div>
                        <div className="profile-activity-post-time">24h</div>
                    </div>
                    <div className="profile-activity-post-first-sentence">I truly believe that I am the Bill Burr of the improv stage.</div>
                    <div className="profile-activity-post-show-more">...show more</div>
                    <div className="profile-activity-post">
                        <img className="profile-activity-post-img" src={BillBurr} />
                        <div className="profile-activity-post-right">
                            <div className="profile-activity-post-title"></div>
                            <div className="profile-activity-post-about">
                                <div className="profile-activity-post-url">comedy.com</div>
                                <div className="profile-activity-post-read-time">2 min read</div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-activity-post-likes">
                        <img className="profile-activity-post-like-img" src={Like} />
                        <div className="profile-activity-post-like-count">1</div>
                    </div>
                </div>
            </div>
            <div className="profile-activity-show-all">Show all activity</div>
        </div>
    )
}