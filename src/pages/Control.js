import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import '../assets/styles/Control.css';

const Control = () => {
    const [focoEncendido, setFocoEncendido] = useState(false);
    const [ventiladorEncendido, setVentiladorEncendido] = useState(false);
    const [sensorTemperatura, setSensorTemperatura] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleFocoClick = () => {
        setFocoEncendido(!focoEncendido);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Confetti se muestra por 3 segundos
    };

    const handleVentiladorClick = () => {
        setVentiladorEncendido(!ventiladorEncendido);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Confetti se muestra por 3 segundos
    };

    const handleSensorClick = () => {
        setSensorTemperatura(!sensorTemperatura);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Confetti se muestra por 3 segundos
    };

    return (
        <div className="Control">
            {showConfetti && <Confetti />}
            <Container className="App" maxWidth="md">
                <Typography variant="h2" gutterBottom>
                    Control de Animaciones
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
                            onClick={handleVentiladorClick}
                        >
                            {ventiladorEncendido ? 'Apagar Ventilador' : 'Prender Ventilador'}
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            variant="contained"
                            color={sensorTemperatura ? "secondary" : "primary"}
                            onClick={handleSensorClick}
                        >
                            {sensorTemperatura ? 'Detener sensor de temperatura' : 'Prender sensor de temperatura'}
                        </Button>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
}

export default Control;
