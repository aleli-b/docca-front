import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import axios from "axios";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  const svHost = import.meta.env.VITE_HOST;
  const auth = useAuth();

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `${svHost}/conversations/user?userId=${auth.user.id}`
      );
      const conversationsData = response.data;
      const updatedConversations = conversationsData.map((conversation) => {
        if (
          `${auth.user.name} ${auth.user.lastName}` ===
          `${conversation.participant2.name} ${conversation.participant2.lastName}`
        ) {
          return {
            ...conversation,
            participant1: conversation.participant2,
            participant2: conversation.participant1,
          };
        } else {
          return conversation;
        }
      });

      setConversations(updatedConversations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const joinConversation = (conversationId) => {
    socket.emit("joinConversation", conversationId);
  };

  const sendMessage = (msg, doctorId) => {
    if (msg === "") {
      toast.error("No puedes enviar un mensaje vacío");
      return Promise.reject(new Error("Mensaje vacío"));
    } else {
      axios
        .post(`${svHost}/messages`, {
          content: msg,
          senderId: auth.user.id,
          receiverId: doctorId,
        })
        .then((response) => {

          // Emit the message to the server via the WebSocket connection
          if (socket) {
            socket.emit("sendMessage", {
              content: response.data.content,
              senderId: response.data.senderId,
              receiverId: response.data.receiverId,
              conversationId: response.data.conversationId,
            });
          }
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          toast.error("Ha habido un error al enviar el mensaje");
        });
    }
  };

  useEffect(() => {
    if (auth.user) {
      getMessages();

      const socketConnection = io(svHost, {
        query: { userId: auth.user.id },
      });

      // socketConnection.on("connect", () => {
      //   console.log("Connected to WebSocket");
      // });

      socketConnection.on("newMessage", async (message) => {        

        const conversationToUpdate = conversations.find(
          (conversation) => conversation.id === message.conversationId
        );

       if (conversationToUpdate) {
          setConversations((prevConversations) => {
            const updatedConversations = prevConversations.map(
              (conversation) =>
                conversation.id === message.conversationId
                  ? {
                      ...conversation,
                      messages: [...conversation.messages, message],
                    }
                  : conversation
            );

            return updatedConversations;
          });
        }
        await getMessages()
      });

      setSocket(socketConnection);
    } else {
      setConversations([]);
      setLoading(false);
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [auth.user]);

  const value = {
    conversations,
    loading,
    getMessages,
    joinConversation,
    sendMessage,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  return useContext(MessageContext);
};
