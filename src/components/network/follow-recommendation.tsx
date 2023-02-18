import React from "react";
import BillBurr from "../../media/profile/billburr.png";
import ShaneGillis from "../../media/my-network/gillis.png";
import NormMacdonald from "../../media/my-network/norm.png";
import JoeRogan from "../../media/my-network/rogan.png";
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
        },
        {
            id: 2,
            firstName: "Shane",
            lastName: "Gillis",
            img: ShaneGillis,
            backgroundImg: Background,
            performerType: "Stand-Up Comedian",
            tagline: "Autism is fake news",
            followers: 123456
        },
        {
            id: 3,
            firstName: "Norm",
            lastName: "Macdonald",
            img: NormMacdonald,
            backgroundImg: Background,
            performerType: "Stand-Up Comedian",
            tagline: "I am not Norm",
            followers: 123456
        },
        {
            id: 4,
            firstName: "Joe",
            lastName: "Rogan",
            img: JoeRogan,
            backgroundImg: Background,
            performerType: "Stand-Up Comedian",
            tagline: "Chimpanzees are strong",
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
                                    <img className="recommendation-card-profile-picture" src={performer.img} />
                                </div>

                                <div className="recommendation-card-middle">
                                    <div className="recommendation-card-info">
                                        <h2 className="recommendation-card-name">{performer.firstName + " " + performer.lastName}</h2>
                                        <div className="recommendation-card-performer-type">{performer.performerType}</div>
                                        <div className="recommendation-card-performer-tagline">{performer.tagline}</div>
                                    </div>
                                    <div className="recommendation-card-followers">{performer.followers+ " followers"}</div>
                                </div>

                                <div className="recommendation-card-bottom">
                                    <button className="recommendation-card-follow-btn">Follow</button>
                                </div>
                            </div>     
                        );
                    })}
                </div>

        </div>
    )
}