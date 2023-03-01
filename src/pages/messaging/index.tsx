import React, { useEffect, useState } from "react";
import { useUserId } from "../../context/userIdContext";
import RoomInfo, { ReducedProfileCard, Messages } from "../../types/messaging";
import MessagingService from "../../services/home/messaging";
import "./index.css";
import io, { Socket } from "socket.io-client";


function MessagingContent(props: {roomId: string, userId: string, friend: ReducedProfileCard, friendId: string, socket: Socket}) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { socket } = props;

  const createMessage = async () => {
    try {
      socket.emit("message", {
        roomId: props.roomId,
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
    const roomId = props.roomId;

    if (roomId) {
      if (!socket.connected) {
        socket.emit("join", roomId);
      }

      const fetchMessages = async () => {
        try {
          const response = await MessagingService.getMessages(roomId);
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
  }, [props.roomId, newMessage, socket]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessage();
  };

  console.log(messages);

  return (
    <div>
      <h1>Messaging</h1>
      <h2>Recipient: {`${props.friend.firstName} ${props.friend.lastName}`}</h2>
      <ul>
        {messages.map((message, index) => {
          let messageAlignment = "self-align";
          if (message.user.id !== props.userId) {
            messageAlignment = "recieve-align";
          }
          return (
            <div className={`message-cont ${messageAlignment}`}>
              <img className="profile-picture-small" src={message.user.profileCard.image}></img>
              <li key={index}>[{message.user.firstName} {message.user.lastName}]: {message.content}</li>
            </div>
          );
        })}
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
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
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

  return (
    <main>
      <h2>Talking Shop</h2>
      <div className="messages-select-content-cont">
      {rooms && <div className="user-messages-cont">
        {rooms.map((room) => (
          <div key={room.room.id} className="user-message-cont comp" onClick={() => setSelectedRoom(room.room.id)}>
            <img src={room.profileCard.image} alt="" className="profile-picture-small"/>
            <div className="profile-text-info-cont">
              <p className="profile-name">{room.profileCard.firstName} {room.profileCard.lastName}</p>
            </div>
            {room.messages.length ? <p className="message-preview">{room.messages[0].user.firstName}: {room.messages[0].content}</p> : <p className="message-preview">Start a conversation!</p>}
          </div>
        ))}
        </div>}
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
      </div>
    </main>
  );
}
