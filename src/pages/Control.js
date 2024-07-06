import React, { useState } from 'react';
import { Button, Container, Typography, Slider, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import '../assets/styles/Control.css';

const Control = () => {
    const [focoEncendido, setFocoEncendido] = useState(false);
    const [intensidadFoco, setIntensidadFoco] = useState(50);
    const [ventiladorEncendido, setVentiladorEncendido] = useState(false);
    const [sensorTemperatura, setSensorTemperatura] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [circleColor, setCircleColor] = useState('#ccc'); // Estado inicial para el color del círculo

    const handleFocoClick = () => {
        setFocoEncendido(!focoEncendido);
        if (!focoEncendido) {
            setShowDialog(true);
            setTimeout(() => {
                setFocoEncendido(false);
            }, 1000);
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleChangeIntensidadFoco = (event, newValue) => {
        setIntensidadFoco(newValue);
    };

    return (
        <div className="Control">
            <Confetti />
            <Container className="App" maxWidth="md">
                <Typography variant="h2" gutterBottom>
                    Control de Actividades
                </Typography>
                <div className="buttons-container">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            variant="contained"
                            color={focoEncendido ? "secondary" : "primary"}
                            onClick={handleFocoClick}
                        >
                            {focoEncendido ? 'Apagar Foco' : 'Prender Foco'}
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            variant="contained"
                            color={ventiladorEncendido ? "secondary" : "primary"}
                            onClick={() => setVentiladorEncendido(!ventiladorEncendido)}
                        >
                            {ventiladorEncendido ? 'Apagar Ventilador' : 'Prender Ventilador'}
                        </Button>
                        <div className="circle" style={{ backgroundColor: circleColor }}></div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            variant="contained"
                            color={sensorTemperatura ? "secondary" : "primary"}
                            onClick={() => setSensorTemperatura(!sensorTemperatura)}
                        >
                            {sensorTemperatura ? 'Detener sensor de temperatura' : 'Prender sensor de temperatura'}
                        </Button>
                    </motion.div>
                </div>
            </Container>

            {/* Diálogo para ajustar la intensidad del foco */}
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogTitle>Ajustar Intensidad del Foco</DialogTitle>
                <DialogContent>
                    <Slider
                        value={intensidadFoco}
                        onChange={handleChangeIntensidadFoco}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Control;
