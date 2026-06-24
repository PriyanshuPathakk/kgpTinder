import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [recPhoto , setRecPhoto] = useState("")
  const messageEndRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({behavior : "smooth"})
  } , [messages])

  useEffect(() => {
    const prevChat = async () => {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      console.log(res?.data?.chat?.messages)
      setRecPhoto(res?.data?.receiver?.photoUrl || "")
      const prevMessages = res?.data?.chat?.messages.map((mes) => {
        return {
          firstName: mes.sender.firstName,
          message: mes.text,
          timestamp: mes.updatedAt,
          senderId : mes.sender._id  
        };
      });
      setMessages(prevMessages);
    };
    prevChat();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // join chat as thew page is loaded
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, message, timestamp , senderId}) => {
      console.log(message);
      setMessages((prev) => [...prev, { firstName, message, timestamp, senderId }]);
      setMessage("");
    });

    return () => {
      socket.disconnect();
    };
  }, [targetUserId, userId, firstName, messages]);

  const handleMessaging = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { message, firstName, userId, targetUserId });
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="w-[40vw] h-[80vh] bg-base-300 rounded-lg">
        <div className="w-full h-[7vh] bg-slate-950 rounded-t-lg flex items-center">
          <div className="text-3xl p-4">Chat</div>
        </div>
        <div className="overflow-y-scroll w-full h-[63vh] ">
          {/**message box */}
          {messages.map((mes, index) => {
            const { firstName, message, timestamp } = mes;
            const isCurrentUser = mes.senderId === userId
  
            return (
              <div key={index}>
                <div  className= {isCurrentUser ? "chat chat-end" : "chat chat-start"}  >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={isCurrentUser ? user?.photoUrl : recPhoto}
                      />
                    </div>
                  </div>
                  <div className="chat-header text-lg">
                    {firstName}
                    <time className="text-sm opacity-50"> {timestamp}</time>
                  </div>
                  <div className="chat-bubble text-2xl">{message}</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              </div>
            );
          })}
          {/* Scrolling anchor */}
          <div ref={messageEndRef} />
        </div>
        
        <div className="w-full rounded-b-lg bg-slate-950 h-[10vh] flex items-center pl-10 ">
          <input
            type="text"
            placeholder="Type your message here ..."
            className="input input-success w-[20vw] text-xl"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn btn-outline btn-success ml-5 text-xl"
            onClick={() => handleMessaging()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
