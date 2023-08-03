import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, Input, InputLabel, List, SvgIcon, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UploadTestModal } from '../../components/UploadTestModel/UploadTestModel';
import { useState } from 'react';


export const LabTests = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleClick = (event) => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    return (
        <Container sx={{ minHeight: '100dvh ', mt: 2 }}>
            <Grid container direction={'column'}>
                <Grid item>
                    <Typography variant='h2' gutterBottom sx={{ color: '#145C6C', fontWeight: 'bold', }}>Estudios</Typography>
                </Grid>
                <Grid item sx={{ mb: 2, }}>
                    <Button component="span" variant='contained' onClick={handleClick}>Subir Estudios</Button>
                </Grid>
                <Grid item>
                    <Box>
                        <List>
                            <React.Fragment>
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
                                                flexDirection: "row",
                                                justifyContent: 'space-around'
                                            }}
                                        >
                                            <SvgIcon component={AddIcon} />
                                            <Typography sx={{}}>
                                                Consulta 1
                                            </Typography>
                                            <Typography>
                                                Paciente 1
                                            </Typography>
                                            <Typography>
                                                Doctor 1
                                            </Typography>
                                            <SvgIcon component={ExpandMoreIcon} inheritViewBox />
                                        </Container>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Typography>Fecha: 3/08/2023</Typography>
                                                <Typography>Hora: 10:00</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Typography>Paciente Lucas Gonzalez</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Typography>Especialista Pepe Sand</Typography>
                                                <Typography>Pediatra</Typography>
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </React.Fragment>
                        </List>
                    </Box>
                </Grid>
            </Grid>
            <UploadTestModal open={openModal} onClose={handleCloseModal} />
        </Container >
    )
}
