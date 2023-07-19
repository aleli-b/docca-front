import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../components/context/AuthContext';

export const MessageInput = ({ getMessages }) => {
    const [messageContent, setMessageContent] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const svHost = import.meta.env.VITE_HOST;
    const auth = useAuth();

    const sendMessage = (value) => {
        axios
            .post(`${svHost}/messages`, {
                content: messageContent,
                senderId: auth.user.id,
                receiverId: selectedValue,
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
            <FormControl variant="outlined">
                <InputLabel id="select-label">Selecciona un nombre</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={selectedValue}
                    onChange={handleChange}
                    label="Selecciona un nombre"
                >
                    <MenuItem value="78f9588c-685c-4238-ba50-dc33f262b02e" on>Pedro</MenuItem>
                    <MenuItem value="02f117df-d88c-4e03-a8d1-bd102d33871c">Ale</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};