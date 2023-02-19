import Cancel from "../../media/icons/cancel.png";
import { RecommendedData } from "../../types/my-network";

export default function FollowRecommendation(props: {cardData: RecommendedData[], cardTitle: string}){
    
    return(
        <div className="follow-recommendation-cont">
            <div className="recommendation-header">
                <h2 className="recommendation-title">{props.cardTitle}</h2>
                <button className="recommentation-header-btn">See All</button>
            </div>
            <div className="recommendation-card-cont">
                    {props.cardData.map((card) => {
                        return (   
                            <div className="recommendation-card" key={card.id}>
                                <div className="recommendation-card-top">
                                    <img className="recommendation-card-cancel" src={Cancel}/>
                                    <img className="recommendation-card-background" src={card.backgroundImg}/>
                                    <img className="recommendation-card-profile-picture" src={card.img} />
                                </div>

                                <div className="recommendation-card-middle">
                                    <div className="recommendation-card-info">
                                        <h2 className="recommendation-card-name">{card.name}</h2>
                                        <div className="recommendation-card-performer-type">{card.type}</div>
                                        <div className="recommendation-card-performer-tagline">{card.tagline}</div>
                                    </div>
                                    <div className="recommendation-card-followers">{card.followers+ " followers"}</div>
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