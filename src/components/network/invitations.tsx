import React from "react";
import Denise from "../../media/home/denise-profile-picture.png";
import Rachel from "../../media/home/rachel-profile-picture.png";
import Eric from "../../media/profile/eric-alexander-profile-pic.png";
import Ian from "../../media/profile/ian-badenhurst-profile-pic.png";
import Equal from "../../media/icons/equal.png";
import "../../styles/my-network/invitations.css";

export default function NetworkInvitations() {

    // delete this fake data later
    const FakeInvites = [{
        id: 1,
        firstName: "Denise",
        lastName: "Ferguson",
        img: Denise,
        tagline: "Improve | Storytelling",
        sharedConnections: ["Stevie Smiff", "Jacob Tones"]
    },
    {
        id: 2,
        firstName: "Rachel",
        lastName: "Loo",
        img: Rachel,
        tagline: "money | clothes",
        sharedConnections: ["Ian Bobs", "Geo Genes"]
    },
    {
        id: 3,
        firstName: "Eric",
        lastName: "Alexander",
        img: Eric,
        tagline: "tok tok master",
        sharedConnections: ["Ian Bobs", "Geo Genes"]
    },
    {
        id: 4,
        firstName: "Ian",
        lastName: "Badenhurst",
        img: Ian,
        tagline: "sadness | fried chicken",
        sharedConnections: ["Ian Bobs", "Geo Genes"]
    }
    ]

    return(
        <div className="network-invitations-cont comp">
            <div className="network-invitation-header">
                <h2>Invitations</h2>
                <button className="network-invitation-header-button">See All</button>
            </div>
            <div className="network-invitation-items-cont">
                {FakeInvites.map( (inviter) => {
                    return (
                        <div className="network-invitation-item" key={inviter.id}>
                            <img className="profile-picture-medium" src={ inviter.img } />
                            <div className="network-invitation-info">
                                <div className="network-invitation-name">{inviter.firstName + " " + inviter.lastName} </div>
                                <div className="network-invitation-tagline">{inviter.tagline}</div>
                                <div className="network-invitation-shared-connections">
                                    <img src={Equal} className="network-invitation-shared-connections-img" />
                                    <div className="network-invitation-shared-connections-people">{inviter.sharedConnections[0] + " & others"}</div>
                                </div>
                            </div>
                            <div className="network-invitation-btns">
                                <button className="network-invitation-ignore-btn">Ignore</button>
                                <button className="network-invitation-accept-btn">Accept</button>
                            </div>
                        </div>
    
                    );
                })}

            </div>
        </div>
    )
}