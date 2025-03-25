import React from 'react'
import { useEffect,useState } from 'react';
import { useAuth } from '../../context/usercontext';
export const Chat = () => {
    const {user,socket,receiver, setReceiver}=useAuth()
    // const [username, setUsername] = useState("");
  // const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [groupMessage, setGroupMessage] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchPreviousGroupMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/groupmessages?username=${user._id}`);
        const data = await response.json();
        console.log("Group Messages:", data);
        setGroupMessage(data);
      } catch (error) {
        console.error("Error fetching group messages:", error);
      }
    };

    fetchPreviousGroupMessages();
  }, [user]);

    // Fetch private messages when username & receiver are set
    useEffect(() => {
        if (!user || !receiver) return;
    
        const fetchPreviousMessages = async () => {
          try {
            const response = await fetch(`http://localhost:3000/messages?username=${user._id}&receiver=${receiver}`);
            const data = await response.json();
            console.log("Private Messages:", data);
            setMessages(data);
          } catch (error) {
            console.error("Error fetching messages:", error);
          }
        };
    
        fetchPreviousMessages();
      }, [user, receiver]);

      useEffect(() => {
        socket.on("receiveMessage", (msg) => {
          setMessages((prev) => [...prev, msg]);
          console.log("receiveMessage")
        });
        return () => socket.off("receiveMessage");
      }, []);

      // Send message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { sender: user._id, receiver, message });

      // Save message in local state
      setMessages((prev) => [...prev, { sender: user._id, message }]);
      setMessage("");
    }
  };
  return (
    <div className="chat-container p-4 max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg">
    <h2 className="text-xl font-bold text-center mb-4">Chat Application</h2>

    {/* Username Input */}
    {/* <input
      type="text"
      placeholder="Enter your username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full p-2 mb-2 border rounded"
    /> */}

    {/* Receiver Input */}
    <input
      type="text"
      placeholder="Enter receiver's username"
      value={receiver}
      onChange={(e) => setReceiver(e.target.value)}
      className="w-full p-2 mb-2 border rounded"
    />

    {/* <button onClick={registerUser} className="w-full p-2 bg-blue-500 text-white rounded">Register</button> */}

    <div className="chat-box border p-2 mt-4 rounded bg-white h-40 overflow-y-auto">
      {messages.map((msg, index) => (
        <p key={index} className={msg.sender === user._id ? "text-green-600" : "text-red-600"}> <p>{msg.sender==user._id||(msg.receiver==user._id&&msg.sender==receiver)?
          <p>{msg.sender}:{msg.message}</p>:""}
          </p>
        </p>
      ))}
    </div>

    {/* Group Messages */}
    <div className="chat-box border p-2 mt-2 rounded bg-white h-20 overflow-y-auto">
      {groupMessage?.map((msg, index) => (
        <p
          key={index}
          className="cursor-pointer text-blue-500"
          onClick={() => setReceiver(msg.participants.find((p) => p !== user._id))}
        >
          {msg.participants.find((p) => p !== user._id)}
        </p>
      ))}
    </div>

    {/* Message Input */}
    <input
      type="text"
      placeholder="Enter message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full p-2 mt-2 border rounded"
    />

    <button onClick={sendMessage} className="w-full p-2 mt-2 bg-green-500 text-white rounded">Send</button>
  </div>
  )
}
