import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Divider, CircularProgress, Container, } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import { useMessageContext } from '../../components/context/MessageContext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Messages.css'

export const Messages = () => {
  const { conversations, loading, joinConversation  } = useMessageContext();

  useEffect(() => {    
    conversations.forEach((conversation) => {
      joinConversation(conversation.id);
    });
  }, [conversations, joinConversation]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh' }}>
        <CircularProgress color="success" />
      </Container>
    );
  }

  if (conversations.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>No conversations found.</p>
      </Container>
    );
  }
  console.log(conversations)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', minHeight: '100dvh', minWidth: '99%', margin: 2 }}>
      <Typography variant='h1' sx={{ color: '#145C6C', fontSize: '3rem' }}>Mis Conversaciones </Typography>
      <List>
        {conversations.map((conversation) => (
          <React.Fragment key={conversation.id}>
            <Accordion sx={{ display: 'flex', flexDirection: 'column', margin: 2, }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ backgroundColor: 'gray', padding: 4, }}
              >
                <Container id='bardero' sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                  <AddCircleRoundedIcon />
                  <Typography>{`${conversation.participant2.userType === 'doctor' && 'Dr.' || ''} ${conversation.participant2.name} ${conversation.participant2.lastName}`}</Typography>
                  <Typography>{`${conversation.participant2.category || 'paciente'}`}</Typography>
                </Container>
              </AccordionSummary>
              <AccordionDetails>
                <ListItem>
                  <ListItemText>
                    <Typography variant="h6">Conversation ID: {conversation.id}</Typography>
                    <Typography variant="subtitle1">
                      Participant 1: {conversation.participant1.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Participant 2: {conversation.participant2.name} {conversation.participant2.id}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider />
                {conversation.messages
                  .slice() 
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((message, i) => (
                    <ListItem key={i}>
                      <ListItemText>
                        <Typography variant="body1">{message.content}</Typography>
                        <Typography variant="caption">  
                
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                <Divider />
                <MessageInput doctorId={conversation.participant2.id} />
              </AccordionDetails>
            </Accordion>
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};
