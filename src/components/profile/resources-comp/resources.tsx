import React from "react";
import Network from "../../../media/icons/my-network.png";
import Creator from "../../../media/icons/creator.png";
import "../../../styles/profiles/profile-resources.css";

export default function ProfileResources() {
    return(
        <div className="profile-resources-cont comp">
            <h2 className="profile-resources-header">Resources</h2>
            <div className="profile-resources-items-cont">
                <div className="profile-resources-item">
                    <img className="profile-resources-item-img" src={Creator} />
                    <div className="profile-resources-info-cont">
                        <p className="profile-resources-item-type">Creator Mode</p>
                        <p className="profile-resources-item-description">Get discovered, showcase your content, and more.</p>
                    </div>
                </div>
                <div className="profile-resources-item">
                    <img className="profile-resources-item-img" src={Network}/>
                    <div className="profile-resources-info-cont">
                        <p className="profile-resources-item-type">My network</p>
                        <p className="profile-resources-item-description">Manage your connections and interests.</p>
                    </div>
                </div>
            </div>
            <button className="hidden-btn"><div className="profile-resources-show-all">Show All Resources </div></button>
        </div>
    );
}
