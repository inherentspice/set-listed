import React, { useEffect, useState } from "react";
import "../../styles/my-network/invitations.css";
import { User } from "../../types/my-network";
import { handleAcceptClick, handleIgnoreClick } from "./handle-clicks";

export default function NetworkInvitations(props: {pendingConnections: User[] | undefined, user: string}) {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [pending, setPending] = useState<User[] | undefined>(props.pendingConnections);

    function handleShowMoreClick(): void{
        setShowMore(true);
    }

    function handleShowLessClick(): void{
        setShowMore(false);
    }

    useEffect(() => {
      setPending(props.pendingConnections);
    }, [props.pendingConnections]);

    return(
      <div className="network-invitations-cont comp">
        <div className="network-invitation-header">
          <h2>Invitations</h2>
          <button className="network-invitation-header-button">See All</button>
        </div>
        <div className="network-invitation-items-cont">
          {pending === undefined || pending.length === 0 && <p>No pending connection requests</p>}
          {pending !== undefined && !showMore && pending.map((inviter, index) => {
            if (index < 2) {
              return (
                <div className="network-invitation-item" key={inviter.id}>
                  <a href={`user/${inviter.id}`}>
                    <img className="profile-picture-medium" src={inviter.profileCard.image} />
                  </a>
                  <div className="network-invitation-info">
                    <p className="network-invitation-name">{inviter.firstName + " " + inviter.lastName}</p>
                    <div className="network-invitation-btns">
                      <button className="network-invitation-ignore-btn" onClick={() => handleIgnoreClick(inviter.id, props.user, pending, setPending)}>Ignore</button>
                      <button className="network-invitation-accept-btn" onClick={() => handleAcceptClick(inviter.id, props.user, pending, setPending)}>Accept</button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          {pending !== undefined && showMore && pending.map((inviter) => {
            return (
              <div className="network-invitation-item" key={inviter.id}>
                <img className="profile-picture-medium" src={inviter.profileCard.image} />
                <div className="network-invitation-info">
                  <p className="network-invitation-name">{inviter.firstName + " " + inviter.lastName}</p>
                  <div className="network-invitation-btns">
                    <button className="network-invitation-ignore-btn" onClick={() => handleIgnoreClick(inviter.id, props.user, pending, setPending)}>Ignore</button>
                    <button className="network-invitation-accept-btn" onClick={() => handleAcceptClick(inviter.id, props.user, pending, setPending)}>Accept</button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
          {pending !== undefined && pending.length > 3 && !showMore && <div className="network-invitation-show-more-less" onClick={() => handleShowMoreClick()}>Show More</div>}
          {pending !== undefined && pending.length > 3 && showMore && <div className="network-invitation-show-more-less" onClick={() => handleShowLessClick()}>Show Less</div>}
        </div>
    );
}
