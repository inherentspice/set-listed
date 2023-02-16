import React from "react";
import Denise from "../../media/home/denise-profile-picture.png";
import Equal from "../../media/icons/equal.png";
import "../../styles/my-network/invitations.css";

export default function NetworkInvitations() {
    return(
        <div className="network-invitations-cont comp">
            <div className="network-invitation-header">
                <h2>Invitations</h2>
                <button className="network-invitation-header-button">See All</button>
            </div>
            <div className="network-invitation-items-cont">

                <div className="network-invitation-item">
                    <img className="profile-picture-medium" src={ Denise } />
                    <div className="network-invitation-info">
                        <div className="network-invitation-name">Denis Ferguson</div>
                        <div className="network-invitation-tagline">Improv | Storytelling</div>
                        <div className="network-invitation-shared-connections">
                            <img src={Equal} className="network-invitation-shared-connections-img" />
                            <div className="network-invitation-shared-connections-people">Stevie Smiff & Jacob Tones</div>
                        </div>
                    </div>
                    <div className="network-invitation-btns">
                        <button className="network-invitation-ignore-btn">Ignore</button>
                        <button className="network-invitation-accept-btn">Accept</button>
                    </div>
                </div>
            </div>
        </div>
    )
}