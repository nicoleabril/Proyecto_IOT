import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import '../assets/styles/Control.css';

const Control = () => {
    const [focoEncendido, setFocoEncendido] = useState(false);
    const [ventiladorEncendido, setVentiladorEncendido] = useState(false);
    const [sensorTempuratura, setsensorTempuratura] = useState(false);

    return (
        <div className="App">
            <Container className="App" maxWidth="md">
                <Typography variant="h2" gutterBottom>
                    Control de Animaciones
                </Typography>
                <div className="buttons-container">
                    <Button
                        variant="contained"
                        color={focoEncendido ? "secondary" : "primary"}
                        onClick={() => setFocoEncendido(!focoEncendido)}
                    >
                        {focoEncendido ? 'Apagar Foco' : 'Prender Foco'}
                    </Button>
                    <Button
                        variant="contained"
                        color={ventiladorEncendido ? "secondary" : "primary"}
                        onClick={() => setVentiladorEncendido(!ventiladorEncendido)}
                    >
                        {ventiladorEncendido ? 'Apagar Ventilador' : 'Prender Ventilador'}
                    </Button>
                    <Button
                        variant="contained"
                        color={sensorTempuratura ? "secondary" : "primary"}
                        onClick={() => setsensorTempuratura(!sensorTempuratura)}
                    >
                        {sensorTempuratura ? 'Detener sensor de temperatura' : 'Prender sensor de temperatura'}
                    </Button>
                </div>
                <div className="actividades">
                    <motion.div
                        className="foco"
                        animate={{ opacity: focoEncendido ? 1 : 0.3 }}
                        transition={{ duration: 0.5 }}
                        style={{ backgroundColor: focoEncendido ? 'yellow' : 'grey' }}
                    />
                    <motion.div
                        className="ventilador"
                        animate={{ opacity: ventiladorEncendido ? 1 : 0.3, rotate: ventiladorEncendido ? 360 : 0 }}
                        transition={{ duration: 1, loop: Infinity }}
                        style={{ backgroundColor: ventiladorEncendido ? 'blue' : 'grey' }}
                    />
                    <motion.div
                        className="sensorTempuratura"
                        animate={{ opacity: sensorTempuratura ? 1 : 0.3, scale: sensorTempuratura ? 1.5 : 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ backgroundColor: sensorTempuratura ? 'green' : 'grey' }}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Control;