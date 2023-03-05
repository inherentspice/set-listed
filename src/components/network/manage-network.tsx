import React, {useState} from "react";
import ReactDOM from "react-dom";
import MyNetwork from "../../media/icons/my-network.png";
import Group from "../../media/icons/group.png";
import Fans from "../../media/icons/fans.png";
import Contact from "../../media/icons/contacts.png";
import Event from "../../media/icons/event.png";
import Hashtag from "../../media/icons/hashtag.png";
import "../../styles/my-network/manage-network.css";
import { User } from "../../types/my-network";
import { useNavigate } from "react-router-dom";
import MessagingService from "../../services/home/messaging";


export default function NetworkManage(props: {friends: User[], userId: string}) {
  const [expandedConnections, setExpandedConnections] = useState<boolean>(false);

  function handleViewConnections(): void{
    setExpandedConnections(!expandedConnections);
  }

  function ShowExpandedConnections() {
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<User[]>(props.friends);
    const navigate = useNavigate();

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setSearch(e.target.value);
      if (props.friends) {
        const filteredConnections = props.friends.filter((friend) => {
          const name = `${friend.firstName} ${friend.lastName}`.toLowerCase();
          if (name.indexOf(e.target.value.toLowerCase()) >= 0) {
            return friend;
          }
        });
        setSearchResults(filteredConnections)
      }
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

    function handleDeleteContact(userId: string, friendId: string): void{
      console.log("deleting");
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleViewConnections()}></div>
        <div className="expanded-profile-overlay">
        <h2>{props.friends ? props.friends.length : 0} Connection{props.friends && props.friends.length > 1 ? "s" : ""}</h2>
        <form className="start-post-user-form">
          <label className="profile-add-label">
            Search:
            <input type="text" value={search} onChange={handleSearchChange} />
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
            )
          }) :
          <p>No users found</p>
          }
        </div>
        </div>
      </>,
      document.body
    )
  }

  return(
    <div className="network-manage-cont comp">
      <h2>Manage my network</h2>
      <div className="network-manage-items-cont" onClick={() => handleViewConnections()}>
          <img className="network-manage-item-img" src={MyNetwork} />
          <div className="network-manage-item-name">Connections</div>
          <div className="network-manage-item-count">{props.friends ? props.friends.length : 0}</div>
      </div>
                {/* <a className="network-manage-item" href="../my-network/groups">
                    <img className="network-manage-item-img" src={Group} />
                    <div className="network-manage-item-name">Groups</div>
                    <div className="network-manage-item-count">5</div>
                </a>

                <a className="network-manage-item" href="../my-network/fans">
                    <img className="network-manage-item-img" src={Fans} />
                    <div className="network-manage-item-name">Fans</div>
                    <div className="network-manage-item-count">5</div>
                </a>


                <a className="network-manage-item" href="../my-network/contacts">
                    <img className="network-manage-item-img" src={Contact} />
                    <div className="network-manage-item-name">Contacts</div>
                    <div className="network-manage-item-count">5</div>
                </a>


                <a className="network-manage-item" href="../my-network/events">
                    <img className="network-manage-item-img" src={Event} />
                    <div className="network-manage-item-name">Events</div>
                    <div className="network-manage-item-count">5</div>
                </a>

                <a className="network-manage-item" href="../my-network/hashtags">
                    <img className="network-manage-item-img" src={Hashtag} />
                    <div className="network-manage-item-name">Hashtags</div>
                    <div className="network-manage-item-count">5</div>
                </a> */}
          {expandedConnections && <ShowExpandedConnections/>}
        </div>
    )
}
