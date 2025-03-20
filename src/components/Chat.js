"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";
import { getToken } from "../services/auth";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chat = () => {
  const { discussionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await api.get(`/discussions/${discussionId}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to load messages. Please try again."
      );
    }
  }, [discussionId]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token: getToken() },
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.IO");
      socket.emit("joinDiscussion", discussionId);
    });

    socket.on("newMessage", (message) => {
      console.log("Received new message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error, socket);
      toast.error("Connection error. Please refresh the page.");
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [discussionId]);

  useEffect(() => {
    fetchMessages();
  }, [discussionId, fetchMessages]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      const token = getToken();
      const user = JSON.parse(atob(token.split(".")[1]));
      const authorId = user.id;

      if (!authorId) {
        throw new Error("Invalid token: Unable to extract authorId");
      }

      const response = await api.post(`/discussions/${discussionId}/messages`, {
        content: newMessage,
        authorId,
      });

      if (response.data) {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-6">
            Discussion Chat
          </h1>
          <div className="h-[500px] overflow-y-auto mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-start space-x-3">
                  {/* Display different colors for staff and student avatars */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      message.role === "staff" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    {message.author.name.charAt(0)}
                  </div>
                  <div>
                    {/* Display the author's name and role */}
                    <p className="font-semibold text-blue-700">
                      {message.author.name} ({message.role})
                    </p>
                    <p className="text-gray-700">{message.content}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chat;
