import React, { useEffect, useState } from "react";
import { useUserId } from "../../context/userIdContext";
import RoomInfo, { ReducedProfileCard, Messages } from "../../types/messaging";
import MessagingService from "../../services/home/messaging";
import "./index.css";
import io from "socket.io-client";
import axios from "axios";


function MessagingContent(props: {roomId: string, userId: string, friend: ReducedProfileCard, friendId: string}) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [roomId, setRoomId] = useState(props.roomId);
  const socket = io("http://localhost:8080");


  const createMessage = async () => {
    try {
      socket.emit("message", {
        roomId,
        sender: props.userId,
        recipient: props.friendId,
        content: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (roomId) {
      socket.emit("join", roomId);

      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/messaging/${roomId}`);
          setMessages(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchMessages();

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message] as Messages[]);
      });

      return () => {
        socket.emit("leave", roomId);
        socket.off();
      };
    }
  }, [roomId, newMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessage();
  };

  return (
    <div>
      <h1>Messaging</h1>
      <h2>Recipient: {`${props.friend.firstName} ${props.friend.lastName}`}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>[{message.user}]: {message.content}</li>
        ))}
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default function Messaging() {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
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

  console.log(rooms)

  return (
    <main>
      <h2>Rooms for user {userId}</h2>
      <div className="messages-select-content-cont">
      {rooms && <div className="user-messages-cont">
        {rooms.map((room) => (
          <div className="user-message-cont comp" onClick={() => setSelectedRoom(room.room.id)}>
            <img src={room.profileCard.image} alt="" className="profile-picture-small"/>
            <div className="profile-text-info-cont">
              <p className="profile-name">{room.profileCard.firstName} {room.profileCard.lastName}</p>
            </div>
            {room.messages.content ? <p>{room.messages.content}</p> : <p>Start a conversation!</p>}
          </div>
        ))}
        </div>}
        <div className="messages-content-cont comp">
          {selectedRoom ?
          <MessagingContent
          roomId={selectedRoom}
          userId={userId}
          friend={rooms.filter((room => room.room.id === selectedRoom))[0].profileCard}
          friendId={rooms.filter(room => room.room.id === selectedRoom)[0].friendId}
        />
        : <p>Select a chat to see messages</p>}
        </div>
      </div>
    </main>
  );
}
