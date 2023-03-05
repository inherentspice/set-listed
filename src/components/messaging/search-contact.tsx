import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ConnectionService from "../../services/home/connection";
import { Connections, User } from "../../types/my-network";
import MessagingService from "../../services/home/messaging";

export default function SearchContacts(props: {userId: string, setSelectedRoom: Dispatch<SetStateAction<string>>}) {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[] | null>(null);
  const [connectionList, setConnectionList] = useState<User[] | null>(null);

  useEffect(() => {
    (async function() {
      const filteredResults = await ConnectionService.getConnections(props.userId);
      setConnectionList(filteredResults.data.connection.friends)
    }());
  }, [])

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setSearch(e.target.value);
    if (connectionList) {
      const filteredConnections = connectionList.filter((friend) => {
        const name = `${friend.firstName} ${friend.lastName}`.toLowerCase();
        if (name.indexOf(e.target.value.toLowerCase()) >= 0) {
          return friend;
        }
      });
      setSearchResults(filteredConnections)
    }
  }

  async function handleUserClick(friendId: string): Promise<void>{
    try {
      const formObject = {
        userId: props.userId,
        friendId
      }
      const newRoom = await MessagingService.createRoom(formObject);
      props.setSelectedRoom(newRoom.data.room.id)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    <form className="start-post-user-form">
      <label className="profile-add-label">
        Search:
        <input type="text" value={search} onChange={handleSearchChange} />
      </label>
    </form>
    {searchResults && searchResults.map((friend) => (
      <div key={friend.id} className="user-message-cont message-search-result comp" onClick={() => handleUserClick(friend.id)}>
        <img src={friend.profileCard.image} alt="" className="profile-picture-small"/>
        <div className="profile-text-info-cont">
          <p className="profile-name">{friend.firstName} {friend.lastName}</p>
        </div>
    </div>
  ))}
  </>
  )
}
