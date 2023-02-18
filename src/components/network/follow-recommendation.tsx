import React from "react";
import BillBurr from "../../media/profile/billburr.png";
import Background from "../../media/home/profile-background.jpg";
import Cancel from "../../media/icons/cancel.png";

export default function FollowRecommendation(){
    const FakeFollowRecs = [
        {
            id: 1,
            firstName: "Bill",
            lastName: "Burr",
            img: BillBurr,
            backgroundImg: Background,
            performerType: "Stand-Up Comedian",
            tagline: "I am a psycho",
            followers: 123456
        }
    ]
    return(
        <div className="follow-recommendation-cont">
            <div className="recommendation-header">
                <h2 className="recommendation-title">Performers you follow also follow these performers</h2>
                <button className="recommentation-header-btn">See All</button>
            </div>
            <div className="recommendation-card-cont">
                    {FakeFollowRecs.map( (performer) => {
                        return (   
                            <div className="recommendation-card">
                                <div className="recommendation-card-top">
                                    <img className="recommendation-card-cancel" src={Cancel}/>
                                    <img className="recommendation-card-background" src={performer.backgroundImg}/>
                                    <img className="recommendation-card-profile-picture profile-picture-large" src={performer.img} />
                                </div>
                                <div className="recommendation-card-info">
                                    <div className="recommendation-card-name">{performer.firstName + " " + performer.lastName}</div>
                                    <div className="recommendation-card-performer-type">{performer.performerType}</div>
                                </div>

                            </div>     
                        );
                    })}
                </div>

        </div>
    )
}