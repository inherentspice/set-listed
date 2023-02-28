import React, { useState } from "react";
import "../../styles/my-network/invitations.css";
import { User } from "../../types/my-network";

export default function NetworkInvitations(props: {pendingConnections: User[]}) {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [pending, setPending] = useState<User[]>(props.pendingConnections);

    function handleShowMoreClick(): void{
        setShowMore(true);
    }

    function handleShowLessClick(): void{
        setShowMore(false);
    }

    if (pending === undefined || pending.length === 0) {
      return <></>;
    }

    return(
      <div className="network-invitations-cont comp">
        <div className="network-invitation-header">
          <h2>Invitations</h2>
          <button className="network-invitation-header-button">See All</button>
        </div>
        <div className="network-invitation-items-cont">
          {!showMore && pending.map((inviter, index) => {
            if (index < 2) {
              return (
                <div className="network-invitation-item" key={inviter.id}>
                  <a href={`user/${inviter.id}`}>
                    <img className="profile-picture-medium" src={inviter.profileCard.image} />
                  </a>
                  <div className="network-invitation-info">
                    <div className="network-invitation-name">{inviter.firstName + " " + inviter.lastName}</div>
                    <div className="network-invitation-btns">
                      <button className="network-invitation-ignore-btn">Ignore</button>
                      <button className="network-invitation-accept-btn">Accept</button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          {showMore && pending.map((inviter) => {
            return (
              <div className="network-invitation-item" key={inviter.id}>
                <img className="profile-picture-medium" src={inviter.profileCard.image} />
                <div className="network-invitation-info">
                  <div className="network-invitation-name">{inviter.firstName + " " + inviter.lastName}</div>
                  <div className="network-invitation-btns">
                    <button className="network-invitation-ignore-btn">Ignore</button>
                    <button className="network-invitation-accept-btn">Accept</button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
          {pending.length > 3 && !showMore && <div className="network-invitation-show-more-less" onClick={() => handleShowMoreClick()}>Show More</div>}
          {pending.length > 3 && showMore && <div className="network-invitation-show-more-less" onClick={() => handleShowLessClick()}>Show Less</div>}
        </div>
    );
}
