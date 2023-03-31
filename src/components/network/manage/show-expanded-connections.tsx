import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import MessagingService from "../../../services/home/messaging";
import ConnectionService from "../../../services/home/connection";
import { User } from "../../../types/my-network";
import handleSearchChange from "./search-change";

export default function ShowExpandedConnections(props: {
  friends: User[] | undefined,
  handleViewConnections: () => void,
  userId: string
}) {

  const [search, setSearch] = useState<string>("");
  const [friends, setFriends] = useState<User[] | undefined>(props.friends);
  const [searchResults, setSearchResults] = useState<User[] | undefined>(props.friends);
  const navigate = useNavigate();

  if (!searchResults) {
    return <></>;
  }

  async function handleMessageClick(userId: string, friendId: string): Promise<void>{
    try {
      const formObject = {
        userId,
        friendId
      };
      await MessagingService.createRoom(formObject);
      navigate("/messaging");
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async function handleDeleteContact(userId: string, friendId: string): Promise<void>{
    const confirmDelete = confirm("Click OK if you actually want to delete this");
    if (confirmDelete) {
      try {
        const formObject = {
          friendId
        };
        await ConnectionService.deleteFriend(formObject, userId);
        setFriends(prevFriends => prevFriends?.filter(friend => friend.id !== friendId));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className="expanded-profile-overlay-cont" onClick={() => props.handleViewConnections()}></div>
      <div className="expanded-profile-overlay">
        <h2>{props.friends ? props.friends.length : 0} Connection{props.friends && props.friends.length > 1 ? "s" : ""}</h2>
        <form className="start-post-user-form">
          <label className="profile-add-label">
            Search:
            <input type="text" value={search} onChange={(e) => handleSearchChange(e, friends, setSearch, setSearchResults)} />
          </label>
        </form>
        <div className="network-connection-cont">
          {searchResults.length ? searchResults.map((friend) => {
            return (
              <div className="network-connection">
                <img className="profile-picture-medium" src={friend.profileCard.image}/>
                <div className="name-tag-connection">
                  <h3>{friend.firstName} {friend.lastName}</h3>
                  <p>{friend.profileCard.tagline}</p>
                </div>
                <div className="button-cont">
                  <button className='primary-button' onClick={() => handleMessageClick(props.userId, friend.id)}>Message</button>
                  <button className="primary-button" onClick={() => handleDeleteContact(props.userId, friend.id)}>Delete Friend</button>
                </div>
              </div>
            );
          }) :
          <p>No users found</p>
          }
        </div>
      </div>
    </>,
    document.body
  );
}
