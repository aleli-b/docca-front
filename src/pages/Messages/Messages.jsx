import React, { useEffect, useRef } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  CircularProgress,
  Container,
  Box,
  SvgIcon,
  Button,
  Link,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { MessageInput } from "../../components/MessageInput/MessageInput";
import { useMessageContext } from "../../components/context/MessageContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Messages.css";
import { useAuth } from "../../components/context/AuthContext";
import { debounce } from "lodash";

export const Messages = () => {
  const { conversations, loading, joinConversation, getMessages } = useMessageContext();

  const isMobile = useMediaQuery("(max-width:600px)");

  const { user } = useAuth();

  const containerRef = useRef(null);

  // Llama a esta función después de renderizar los mensajes para establecer el scroll en la parte inferior
  function scrollContainerToBottom() {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }


  useEffect(() => {
    conversations.forEach((conversation) => {
      joinConversation(conversation.id);
    });
  }, [conversations, loading, joinConversation]);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
        }}
      >
        <CircularProgress color="success" />
      </Container>
    );
  }

  if (conversations.length === 0) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p>No tienes conversaciones.</p>
      </Container>
    );
  } else
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          minHeight: "100dvh",
          minWidth: "99%",
          margin: isMobile? "2": "0",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#145C6C",
            textAlign: isMobile ? "center" : "left",
            fontFamily: "Work Sans",
            fontSize: "2.5rem",
            fontWeight: "700",
            pt: 4,
          }}
        >
          Chats
        </Typography>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <List sx={{ pt: "2rem", width: isMobile ? "50rem" : "60%" }}>
            {conversations.map((conversation, i) => (
              <React.Fragment key={conversation.id}>
                <Accordion
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: 2,
                    borderRadius: "10px!important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      backgroundColor: "#838383",
                      padding: 4,
                      borderRadius: "10px",
                    }}
                  >
                    <Container
                      id="bardero"
                      maxWidth={"100%"}
                      sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column":"row"
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          flexBasis: "10%",
                        }}
                      >
                        <SvgIcon component={AddIcon} />
                      </Box>
                      <Typography sx={{ flexBasis: "20%" }}>
                        {`Consulta ${i + 1}`}
                      </Typography>
                      <Typography sx={{ flexBasis: "20%" }}>
                        {conversation.messages.length > 0
                          ? new Date(
                              conversation.messages[0].createdAt
                            ).toLocaleDateString("es-ES")
                          : "No hay mensajes"}
                      </Typography>
                      <Typography sx={{ flexBasis: "50%" }}>{`${
                        conversation.participant2.category ||
                        (conversation.participant2.userType === "lab"
                          ? "Laboratorio"
                          : "Paciente") || "Nuevo mensaje"
                      }`}</Typography>

                      <SvgIcon component={ExpandMoreIcon} inheritViewBox />
                    </Container>
                  </AccordionSummary>
                  <AccordionDetails >
                    <Divider />
                    <Box sx={{ overflowY: "auto" ,maxHeight:"50vh" }}  ref={containerRef}>
                      {conversation.messages
                      .slice()
                      .sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                      )
                      .map((message, i) => (
                        <ListItem key={i}>
                          <ListItemText
                            sx={{
                              display: "flex",
                              justifyContent: message.sender.id === user.id ? 'end' : 'start'
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                                backgroundColor: "rgba(131, 131, 131, 0.22)",
                                width: "fit-content",
                                borderRadius: "10px",
                                padding: "5px",
                              }}
                            >
                              <Typography
                                sx={{ fontSize: "16px", fontWeight: "700" }}
                              >
                                {`${message.sender.name} ${message.sender.lastName}:`}
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 1,
                                  p: "1px",
                                  pl: "20px",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "17px", color: "black" }}
                                >
                                  {`${message.content} `}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: "12px",
                                    color: "gray",
                                    pt: "6px",
                                  }}
                                >
                                  {`${new Date(
                                    message.createdAt
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}`}
                                </Typography>
                              </Box>
                            </Box>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </Box>
                    
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "#5F5F5F",
                        borderRadius: "10px",
                        p: "5px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          p: "5px",
                        }}
                      >
                        <Button>
                          <SvgIcon
                            component={AttachFileIcon}
                            sx={{ color: "white" }}
                          ></SvgIcon>
                        </Button>

                        <Link
                          sx={{ fontSize: "1.5rem", color: "#FFF" }}
                          underline="none"
                        >
                          Ir al meet
                        </Link>
                      </Box>
                      <MessageInput doctorId={conversation.participant2.id} />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Container>
    );
};
