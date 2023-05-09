import React, { useEffect, useState } from "react";
import { useUserId } from "../../context/userIdContext";
import RoomInfo from "../../types/messaging";
import MessagingService from "../../services/home/messaging";
// import "./index.css";
import io, { Socket } from "socket.io-client";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IconContext } from "react-icons";
import SearchContacts from "../../components/messaging/search-contact";
import shortenText from "../../utilities/shorten-text";
import MessagingContent from "../../components/messaging/messaging-content";

export default function Messaging() {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const { userId } = useUserId();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messageSearch, setMessageSearch] = useState<boolean>(false);

  useEffect(() => {
    const backendURL = process.env.NODE_ENV === "production" ? "https://setlisted.fly.dev" : "http://localhost:8080";
    const newSocket = io(backendURL);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await MessagingService.getRooms(userId);
        setRooms(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      fetchRooms();
    }
  }, [userId]);

  function handleMessageSearchClick(): void{
    setMessageSearch(!messageSearch);
  }

  return (
    <main className="messages-cont">
      <div className="messages-select-cont">
        <div className="messages-select-header">
          <h2>Talking Shop</h2>
          <div onClick={() => handleMessageSearchClick()}>
            <IconContext.Provider value={{ size: "1.5rem", className: "message-search-icon"}}>
              <BiMessageSquareAdd/>
            </IconContext.Provider>
          </div>
        </div>
        {rooms && !messageSearch && <div className="user-messages-cont">
          {rooms.map((room) => (
            <div key={room.room.id} className="user-message-cont comp" onClick={() => setSelectedRoom(room.room.id)}>
              <img src={room.profileCard.image} alt="" className="profile-picture-small"/>
              <div className="profile-text-info-cont">
                <p className="profile-name">{room.profileCard.firstName} {room.profileCard.lastName}</p>
              </div>
              {room.messages.length ? <p className="message-preview">{room.messages[0].user.firstName}: {shortenText(room.messages[0].content, 50)}</p> : <p className="message-preview">Start a conversation!</p>}
          </div>
        ))}
        </div>}
        {messageSearch && <SearchContacts userId={userId} setSelectedRoom={setSelectedRoom}/>}
      </div>
      <div className="messages-content-cont comp">
          {selectedRoom && socket ?
          <MessagingContent
            roomId={selectedRoom}
            userId={userId}
            friend={rooms.filter((room => room.room.id === selectedRoom))[0].profileCard}
            friendId={rooms.filter(room => room.room.id === selectedRoom)[0].friendId}
            socket={socket}
        />
        : <p>Select a chat to see messages</p>}
      </div>
    </main>
  );
}
