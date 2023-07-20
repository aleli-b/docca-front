import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const MessageContext = createContext();


export const MessageProvider = ({ children }) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const svHost = import.meta.env.VITE_HOST;
    const auth = useAuth()

    const getMessages = () => {
        axios.get(`${svHost}/conversations/user?userId=${auth.user.id}`)
            .then((response) => {
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
            })
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
        if(auth.user){
            getMessages();
        } else {
            setConversations([]);
            setLoading(false);
        }
    }, [auth.user]);

    const value = {
        conversations,
        loading,
        getMessages,
        sendMessage,
    };

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => {
    return useContext(MessageContext);
};