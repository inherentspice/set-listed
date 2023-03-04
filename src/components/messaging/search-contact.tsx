import React, { useEffect, useState } from "react";
import ConnectionService from "../../services/home/connection";
import { Connections, User } from "../../types/my-network";

export default function SearchContacts(props: {userId: string}) {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[] | null>(null);
  const [connectionList, setConnectionList] = useState<User[] | null>(null);

  useEffect(() => {
    (async function() {
      const filteredResults = await ConnectionService.getConnections(props.userId);
      setConnectionList(filteredResults.data.connection.friends)
    }());
  }, [])

  async function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void>{
    try {
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
    } catch (err) {
      console.log(err);
    }
  }
  console.log(searchResults)
  return (
    <>
    <form className="start-post-user-form">
      <label className="profile-add-label">
        Search:
        <input type="text" value={search} onChange={handleSearchChange} />
      </label>
    </form>
    {searchResults && searchResults.map((friend) => (
      <div key={friend.id} className="user-message-cont comp">
        <img src={friend.profileCard.image} alt="" className="profile-picture-small"/>
        <div className="profile-text-info-cont">
          <p className="profile-name">{friend.firstName} {friend.lastName}</p>
        </div>
    </div>
  ))}
  </>
  )
}
