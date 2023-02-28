import React, { useState } from "react";
import ConnectionService from "../../services/home/connection";
import "../../styles/my-network/invitations.css";
import { User } from "../../types/my-network";

export default function NetworkInvitations(props: {pendingConnections: User[], user: string}) {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [pending, setPending] = useState<User[]>(props.pendingConnections);

    function handleShowMoreClick(): void{
        setShowMore(true);
    }

    function handleShowLessClick(): void{
        setShowMore(false);
    }

    async function handleAcceptClick(
      senderId: string,
      id: string
    ): Promise<void>{
      try {
        const formObject = {
          senderId
        };
        await ConnectionService.acceptRequest(formObject, id);
        const updatedPending = pending.filter((friend) => friend.id !== senderId);
        setPending(updatedPending);
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        return Promise.reject();
      }
    }

    async function handleIgnoreClick(
      senderId: string,
      id: string
    ): Promise<void>{
      try {
        const formObject = {
          senderId
        };
        await ConnectionService.declineRequest(formObject, id);
        const updatedPending = pending.filter((friend) => friend.id !== senderId);
        setPending(updatedPending);
        return Promise.resolve();
      } catch (err) {
        console.log(err);
        return Promise.reject();
      }
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
                      <button className="network-invitation-ignore-btn" onClick={() => handleIgnoreClick(inviter.id, props.user)}>Ignore</button>
                      <button className="network-invitation-accept-btn" onClick={() => handleAcceptClick(inviter.id, props.user)}>Accept</button>
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
                    <button className="network-invitation-ignore-btn" onClick={() => handleIgnoreClick(inviter.id, props.user)}>Ignore</button>
                    <button className="network-invitation-accept-btn" onClick={() => handleAcceptClick(inviter.id, props.user)}>Accept</button>
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
