import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const MessageContext = createContext();


export const MessageProvider = ({ children }) => {
    const [conversations, setConversations] = useState([]);
    const svHost = import.meta.env.VITE_HOST;
    const auth = useAuth()

    const getMessages = () => {
        axios.get(`${svHost}/conversations/user?userId=${auth.user.id}`)
            .then((response) => setConversations(response.data))
            .catch((error) => console.error('Error fetching conversations:', error));
    }
    
    const sendMessage = (msg, doctorId) => {
        if (msg === '') {
          toast.error('No puedes enviar un mensaje vacío');
          return Promise.reject(new Error('Mensaje vacío'));
        } else {
          axios
            .post(`${svHost}/messages`, {
              content: msg,
              senderId: auth.user.id,
              receiverId: doctorId,
            })
            .then((response) => {
              console.log('Message sent:', response.data);
            })
            .catch((error) => {
              console.error('Error sending message:', error);
              toast.error('Ha habido un error al enviar el mensaje');
            });
        }
      };

    useEffect(() => {
        getMessages();
    }, [auth.user.id]);

    const value = {
        conversations,
        getMessages,
        sendMessage,
    };

    return (
        <MessageContext.Provider value={ value }>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => {
    return useContext(MessageContext);
  };