import React from "react";
import Network from "../../media/icons/my-network.png";
import Chart from "../../media/icons/chart.png";
import Search from "../../media/icons/search.png";
import { FakeUserData } from "../../dummy-data/fake-users";
import "../../styles/profile-analytics.css";
import { useParams } from "react-router-dom";

export default function ProfileAnalytics() {
    const { username } = useParams();
    const userIndex = FakeUserData.findIndex(x => x.username === username);  

    return(
        <div className="profile-analytics-cont comp">
            <h2 className="profile-analytics-header">Analytics</h2>
            <div className="profile-analytics-items-cont">
                <div className="profile-analytics-item">
                    <img className="profile-analytics-item-img" src={Network}/>
                    <div className="profile-analytics-info-cont">
                        <div className="profile-analytics-type">{FakeUserData[userIndex].userProfileViews+" profile views"}</div>
                        <div className="profile-analytics-description">See who viewed your profile.</div>
                    </div>
                </div>
                <div className="profile-analytics-item">
                    <img className="profile-analytics-item-img" src={Chart} />
                    <div className="profile-analytics-info-cont">
                        <div className="profile-analytics-type">{FakeUserData[userIndex].userPostImpressions+" post impressions"}</div>
                        <div className="profile-analytics-description">See who has engaged with your posts.</div>
                    </div>
                </div>
                <div className="profile-analytics-item">
                    <img className="profile-analytics-item-img" src={Search}/>
                    <div className="profile-analytics-info-cont">
                        <div className="profile-analytics-type">{FakeUserData[userIndex].userSearchAppearances+" search appearances"}</div>
                        <div className="profile-analytics-description">See how often you have appeared in search results.</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
