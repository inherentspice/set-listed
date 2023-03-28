import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../types/my-network";
import ConnectionService from "../../services/home/connection";

export default function HeaderSearch(props: {search: string, setSearch: Dispatch<SetStateAction<string>>}) {

  const [ searchResults, setSearchResults ] = useState<User[] | null>(null);

  useEffect(() => {
    async function getSearchResults() {
      console.log("here")
      const ConnectionMatches = await ConnectionService.getFilteredConnections(props.search);
      setSearchResults(ConnectionMatches.data.connection);
    }
    props.search ? getSearchResults() : setSearchResults(null);
  }, [props.search])

  return (
    <>
      <div className="header-search-results">
        {searchResults &&
        searchResults.map((user) => {
          return (
            <a href={`/user/${user.id}`}>
              <div className="network-connection search-connections">
                <img className="profile-picture-medium" src={user.profileCard.image}/>
                <div className="name-tag-connection">
                  <h3>{user.firstName} {user.lastName}</h3>
                </div>
              </div>
            </a>
          )
      })}
      {!searchResults && <p>No users found...</p>}
      </div>
    </>
  )
}
