import React from "react";
import "../../styles/profile-activity.css";

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

            </div>
            <div className="profile-activity-show-all">Show all activity</div>
        </div>
    )
}