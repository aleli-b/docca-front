import React, { useState } from 'react';
import { TextField, Button, FormControl, } from '@mui/material';
import { useMessageContext } from '../context/MessageContext';

export const MessageInput = ({ doctorId }) => {
    const [messageContent, setMessageContent] = useState('');

    const { getMessages, sendMessage } = useMessageContext();

    const handleSubmit = () => {
        setMessageContent('');
        sendMessage(messageContent, doctorId)
        getMessages();
    }

    return (
        <div>
            <FormControl variant="outlined">
                <TextField
                    label="Type your message"
                    variant="outlined"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Send
                </Button>
            </FormControl>
        </div>
    );
};