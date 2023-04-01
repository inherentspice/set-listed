import React, { useState, useEffect } from "react";
import { ReducedProfileCard, Messages } from "../../types/messaging";
import { Socket } from "socket.io-client";
import MessagingService from "../../services/home/messaging";

export default function MessagingContent(props: {
  roomId: string,
  userId: string,
  friend: ReducedProfileCard,
  friendId: string,
  socket: Socket
}) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messageDisplayIndex, setMessageDisplayIndex] = useState<number>(10);
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

  function handleLoadMoreMessages(): void{
    setMessageDisplayIndex((prev) => prev += 10);
  }


  return (
    <div className="message-info-cont" key={props.roomId}>
      <h1>Messaging</h1>
      <h2>Recipient: {`${props.friend.firstName} ${props.friend.lastName}`}</h2>
      <div className="message-display">
        <ul>
          {messages.length > messageDisplayIndex && <button className="post-edit" onClick={() => handleLoadMoreMessages()}>See more messages...</button>}
          {messages.map((message, index) => {
            if (index > messages.length - messageDisplayIndex) {
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
            }
          })}
        </ul>
      </div>
      <form className="message-form" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button className="message-button" type="submit">Send</button>
      </form>
    </div>
  );
}
