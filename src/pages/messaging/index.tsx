import React, { useEffect, useState } from "react";
import { useUserId } from "../../context/userIdContext";
import RoomInfo from "../../types/messaging";
import MessagingService from "../../services/home/messaging";
import "./index.css";


export default function Messaging() {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const { userId } = useUserId();


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await MessagingService.getRooms(userId);
        setRooms(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, [userId]);

  return (
    <main>
      <h2>Rooms for user {userId}</h2>
      <div className="messages-select-content-cont">
      {rooms && <div className="user-messages-cont">
        {rooms.map((room) => (
          <div className="user-message-cont comp">
            <img src={room.profileCard.image} alt="" className="profile-picture-small"/>
            <div className="profile-text-info-cont">
              <p className="profile-name">{room.profileCard.firstName} {room.profileCard.lastName}</p>
            </div>
            {room.messages.content ? <p>{room.messages.content}</p> : <p>Start a conversation!</p>}
          </div>
        ))}
        </div>}
        <div className="messages-content-cont comp">
          <p>Select a chat to see messages</p>
        </div>
      </div>
    </main>
  );
}
