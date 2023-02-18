import React from "react";
import FollowRecommendation from "./follow-recommendation";
import "../../styles/my-network/recommended.css";

export default function NetworkRecommended() {
    return(
        <div className="network-recommended-cont comp">
            {/* this will be filled with comps */}
            <FollowRecommendation />
        </div>
    )
}