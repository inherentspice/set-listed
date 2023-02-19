import React from "react";
import FollowRecommendation from "./follow-recommendation";
import "../../styles/my-network/recommended.css";
import { RecommendedData } from "../../dummy-data/recommended";

export default function NetworkRecommended() {
    return(
        <div className="network-recommended-cont comp">
            {/* this will be filled with comps */}
            <FollowRecommendation  cardData={RecommendedData[0]} cardTitle="Performers you follow also follow these performers" />
            <FollowRecommendation  cardData={RecommendedData[1]} cardTitle="Venues you might enjoy" />

        </div>
    )
}