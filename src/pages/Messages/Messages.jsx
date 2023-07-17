import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';

export const Messages = ({ userId }) => {
  const [conversations, setConversations] = useState([]);

  const svHost = import.meta.env.VITE_HOST;

  const auth = useAuth();

  useEffect(() => {
    axios.get(`${svHost}/conversations/user?userId=${auth.user.id}`)
      .then((response) => setConversations(response.data))
      .catch((error) => console.error('Error fetching conversations:', error));
  }, [userId]);  

  return (
    <List>
      {conversations.map((conversation) => (
        <React.Fragment key={conversation.id}>
          <ListItem>
            <ListItemText>
              <Typography variant="h6">Conversation ID: {conversation.id}</Typography>
              <Typography variant="subtitle1">
                Participant 1: {conversation.participant1.name}
              </Typography>
              <Typography variant="subtitle1">
                Participant 2: {conversation.participant2.name}
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider />
          {conversation.messages.map((message, i) => (
            <ListItem key={message.id}>
              <ListItemText>
                <Typography variant="body1">{message.content}</Typography>
                <Typography variant="caption">
                  Sent by: {message.sender.name} | Received by: {message.receiver.name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
