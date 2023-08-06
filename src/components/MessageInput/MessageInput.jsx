import React, { useState } from "react";
import { TextField, Button, FormControl, Box, SvgIcon } from "@mui/material";
import { useMessageContext } from "../context/MessageContext";
import SendIcon from "@mui/icons-material/Send";

export const MessageInput = ({ doctorId }) => {
  const [messageContent, setMessageContent] = useState("");

  const { getMessages, sendMessage } = useMessageContext();

  const handleSubmit = () => {
    setMessageContent("");
    sendMessage(messageContent, doctorId);
    getMessages();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <FormControl variant="outlined" sx={{ mt: "10px", width: "100%", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Escribir..."
            sx={{ width: "100%", bgcolor: "white", borderRadius: "10px" }}
            variant="outlined"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyPress={handleKeyPress} // Handle "Enter" key press
          />
          <Button variant="contained" onClick={handleSubmit}>
            <SvgIcon component={SendIcon} inheritViewBox />
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};
