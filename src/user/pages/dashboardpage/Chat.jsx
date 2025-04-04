import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/usercontext";
import { Navbar } from "../../component/Dashboard/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
export const Chat = () => {
  const { user, socket, receiver, setReceiver } = useAuth();
  // const [username, setUsername] = useState("");
  // const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [groupMessage, setGroupMessage] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchPreviousGroupMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/groupmessages?username=${user._id}`
        );
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
        const response = await fetch(
          `http://localhost:3000/messages?username=${user._id}&receiver=${receiver._id}`
        );
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
      console.log("receiveMessage", msg);
    });
    return () => socket.off("receiveMessage");
  }, []);

  // Send message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { sender: user, receiver, message });

      // Save message in local state
      setMessages((prev) => [...prev, { sender: user, message, receiver }]);
      setMessage("");
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <Link to={"/"}>
        <IoMdArrowRoundBack className="fixed top-5 left-5 text-white text-xl " />
      </Link>
      <div className="h-[100vh] w-[100vw] bg-white shadow-lg flex justify-between border-t-2 border-gray-300">
        {/* <h2 className="text-xl font-bold text-center mb-4">Chat Application</h2> */}

        {/* Username Input */}
        {/* <input
      type="text"
      placeholder="Enter your username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full p-2 mb-2 border rounded"
    /> */}

        {/* Receiver Input */}
        {/* <input
      type="text"
      placeholder="Enter receiver's username"
      value={receiver?.name}
      onChange={(e) => setReceiver(e.target.value)}
      className="w-full p-2 mb-2 border rounded"
    /> */}

        {/* <button onClick={registerUser} className="w-full p-2 bg-blue-500 text-white rounded">Register</button> */}
        {/* 1 */}
        <div className="w-[20%] border-r-2 border-gray-300 bg-gray-500 pt-10">
          {groupMessage?.map((msg, index) => (
            <p
              key={index}
              className="cursor-pointer text-blue-500 w-[100%] h-[10%]  mt-1"
              onClick={() => {
                msg.participants.map((p) => {
                  {
                    p._id !== user._id ? setReceiver(p) : "";
                  }
                });
              }}
            >
              {msg?.participants?.map((p) =>
                p._id !== user._id ? (
                  <div className="flex justify-start items-center m-1  bg-gray-400  pl-10 p-1 mt-2 rounded-[5px] ">
                    <img
                      src={p.image.url}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <p className="ml-5 text-xl text-white">{p.name}</p>
                  </div>
                ) : (
                  ""
                )
              )}
            </p>
          ))}
        </div>
        {/* 2 */}
        <div className="w-[80%] border-r-2 bg-gray-300 ">
          <div className="chat-box border p-2 mt-0  rounded bg-gray-200 h-[90%] w-[100%] ">
            <h1 className="bg-gray-500 border-b-2 border-gray-300 text-white h-[10%] rounded-t-[5px]">
              {messages[0]?.sender?._id === user._id ? (
                <div className="flex justify-between items-center p-3">
                  <p className="text-2xl font-semibold">
                    {messages[0]?.receiver?.name}
                  </p>
                  <img
                    src={messages[0]?.receiver?.image.url}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                </div>
              ) : (
                <div className="flex justify-between  items-center p-3">
                  <p className="text-2xl font-semibold">
                    {messages[0]?.sender?.name}
                  </p>
                  <img
                    src={messages[0]?.sender?.image.url}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                </div>
              )}
            </h1>
            <div className="h-[90%] overflow-y-auto">
              {messages.map((msg, index) => (
                <p
                  key={index}
                  className={
                    msg?.sender?._id === user._id
                      ? "text-white  flex justify-end"
                      : "text-white flex justify-start "
                  }
                >
                  {" "}
                  <p>
                    {msg?.sender._id == user._id ||
                    (msg?.receiver._id == user._id &&
                      msg?.sender._id == receiver._id) ? (
                      <p
                        className={
                          msg?.sender._id === user._id
                            ? "bg-green-400 p-3 mt-4 rounded-[5px]"
                            : "bg-gray-600  p-3 mt-4 rounded-[5px]"
                        }
                      >
                        {" "}
                        <p className="text-xs">{msg.sender.name}</p>
                        <hr /> <p className="text-lg mt-1">{msg.message}</p>
                      </p>
                    ) : (
                      ""
                    )}
                  </p>
                </p>
              ))}
            </div>
          </div>
          <div className="flex w-[100%] ">
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-[80%] p-2 mt-2 border-2 border-gray-100 rounded-[5px]"
            />
            <button
              onClick={sendMessage}
              className="w-[20%] ml-5  p-2 mt-2 bg-green-500 text-white rounded"
            >
              Send
            </button>
          </div>
        </div>

        {/* <div className="chat-box border p-2 mt-4 rounded bg-white h-40 overflow-y-auto">
      {messages.map((msg, index) => (
        <p key={index} className={msg?.sender._id === user._id ? "text-green-600" : "text-red-600"}> <p>{msg?.sender._id==user._id||(msg?.receiver._id==user._id&&msg?.sender._id==receiver._id)?
          <p>{msg.sender.name}:{msg.message}</p>:""}
          </p>
        </p>
      ))}
    </div> */}

        {/* Group Messages */}
        {/* <div className="chat-box border p-2 mt-2 rounded bg-white h-20 overflow-y-auto">
      {groupMessage?.map((msg, index) => (
        <p
          key={index}
          className="cursor-pointer text-blue-500"
          onClick={() =>{msg.participants.map((p)=>{
            {p._id!==user._id?setReceiver(p):""}
          })}}
        >
          {msg?.participants?.map((p)=>(
             (p._id!==user._id?
              <p>{p.name}</p>:""
             )
          ))}
        </p>
      ))}
    </div> */}

        {/* Message Input */}
        {/* <input
      type="text"
      placeholder="Enter message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="w-full p-2 mt-2 border rounded"
    />

    <button onClick={sendMessage} className="w-full p-2 mt-2 bg-green-500 text-white rounded">Send</button> */}
      </div>
    </>
  );
};
