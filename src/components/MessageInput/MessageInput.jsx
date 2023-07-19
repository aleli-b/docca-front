import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../components/context/AuthContext';

export const MessageInput = ({ getMessages }) => {
  const [messageContent, setMessageContent] = useState('');

  const svHost = import.meta.env.VITE_HOST;
  const auth = useAuth();

  const sendMessage = () => {
    axios
      .post(`${svHost}/messages`, {
        content: messageContent,
        senderId: auth.user.id,
        receiverId: '0757f5ae-1c60-456c-8d57-9f5b541fb7da', // Pass the specific conversationId here
      })
      .then((response) => {
        console.log('Message sent:', response.data);
        setMessageContent('');
        getMessages();
        // You might want to handle successful message sending, e.g., update the conversation or do a new API call to fetch the updated messages
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div>
      <TextField
        label="Type your message"
        variant="outlined"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <Button variant="contained" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};