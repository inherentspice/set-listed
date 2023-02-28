import React, { useState } from "react";
import Denise from "../../media/home/denise-profile-picture.png";
import Rachel from "../../media/home/rachel-profile-picture.png";
import Eric from "../../media/profile/eric-alexander-profile-pic.png";
import Ian from "../../media/profile/ian-badenhurst-profile-pic.png";
import Nate from "../../media/profile/nate-jones-profile-pic.png";
import Ben from "../../media/profile/ben-frank-profile-pic.png";
import Equal from "../../media/icons/equal.png";
import "../../styles/my-network/invitations.css";

export default function NetworkInvitations() {
    const [showMore, setShowMore] = useState<boolean>(false);

    function handleShowMoreClick(): void{
        setShowMore(true);
    }

    function handleShowLessClick(): void{
        setShowMore(false);
    }


    // delete this fake data later
    const FakeInvites = [
        [
            {
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
            }
        ],
        [
            {
                id: 4,
                firstName: "Ian",
                lastName: "Badenhurst",
                img: Ian,
                tagline: "I live in a fridge",
                sharedConnections: ["Ian Bobs", "Geo Genes"]
            },
            {
                id: 5,
                firstName: "Nate",
                lastName: "Jones",
                img: Nate,
                tagline: "Baddest Boy in Shanghai",
                sharedConnections: ["Ian Bobs", "Geo Genes"]
            },
            {
                id: 6,
                firstName: "Ben",
                lastName: "Frank",
                img: Ben,
                tagline: "I never forget my sisters bday",
                sharedConnections: ["Ian Bobs", "Geo Genes"]
            }
        ]
    ];

    return(
        <div className="network-invitations-cont comp">
            <div className="network-invitation-header">
                <h2>Invitations</h2>
                <button className="network-invitation-header-button">See All</button>
            </div>
            <div className="network-invitation-items-cont">
                {FakeInvites[0].map( (inviter) => {
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

                {showMore && FakeInvites[1].map( (inviter) => {
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
            {!showMore && <div className="network-invitation-show-more-less" onClick={() => handleShowMoreClick()}>Show More</div>}
            {showMore && <div className="network-invitation-show-more-less" onClick={() => handleShowLessClick()}>Show Less</div>}

        </div>
    );
}
