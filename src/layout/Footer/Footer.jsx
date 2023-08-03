import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import docca from "../../assets/Ic2.svg";
import "./Footer.css";
import { Container, TextField, useMediaQuery } from "@mui/material";

export const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-beetwen",
        top: "auto",
        bottom: 0,
        width: "100%",
        margin: "0 auto",
        bgcolor: "#145C6C!important",
      }}
      id="footerNav"
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-beetwen",
        }}
      >
        <Box
          className="column-1"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
            width: isMobile ? "auto" : "50%",
            textAlign: "start",
          }}
        >
          <Typography>Docappoint</Typography>
          <Typography>
            {"Rivadavia Buenos Aires Argentina"}
            {<br />}
            {"soporte@docappoint.com.ar"}
          </Typography>
        </Box>
        <Box
          className="column-2"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
            width: isMobile ? "auto" : "50%",
            textAlign: "end",
            alignItems: isMobile ? "start" : "end",
          }}
        >
          <Typography sx={{width: "14.5rem"}}>Subscribete a nuestro newseller</Typography>
          <Box>
            <input
              type="email"
              placeholder="Email"
              style={{
                border: "0",
                borderBottom: "0.2rem solid white",
                borderRadius: "0.2rem",
                backgroundColor: "#145C6C",
                width: "14.5rem",
                outline: "none",
                color:"white"
              }}
            ></input>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

/*<img src={docca} style={{ height: '5rem' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Typography variant="body2" color="black">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </Typography>
        </Box>*/
