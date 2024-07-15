import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Slider, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import '../assets/styles/Control.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";


const Control = () => {
    const [focoEncendido, setFocoEncendido] = useState(false);
    const [intensidadFoco, setIntensidadFoco] = useState(50);
    const [ventiladorEncendido, setVentiladorEncendido] = useState(false);
    const [sensorTemperatura, setSensorTemperatura] = useState(false);
    const [showFocoDialog, setShowFocoDialog] = useState(false);
    const [showSensorDialog, setShowSensorDialog] = useState(false);
    const [circleColor, setCircleColor] = useState('#ccc');
    const [temperatura, setTemperatura] = useState(0);
    const [humedad, setHumedad] = useState(0);
    const [clientLED, setClientLED] = useState([]);
    const [client, setClient] = useState([]);


    useEffect(() => {
        const wsUrl = 'ws://192.168.1.7:8000/ws/LED';
        const clientLED = (new W3CWebSocket(wsUrl)); // Use native WebSocket
        setClientLED(clientLED);

        clientLED.onopen = () => {
            console.log('Conexión WebSocket abierta');
        };

        clientLED.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setIntensidadFoco(Number(data.data.replace("G","")));
            // Aquí puedes actualizar el estado de React con los datos recibidos
        };

        return () => {
            clientLED.close();
        };

    }, []);
    
    useEffect(() => {
        if(client !== null) return
        const webSocketHumedad = () => {
            const wsUrl = 'ws://192.168.1.7:8000/ws/humidity';
            const client = (new W3CWebSocket(wsUrl)); // Use native WebSocket

            client.onopen = () => {
                console.log('Conexión WebSocket abierta');
            };

            client.onmessage = (message) => {
                const data = JSON.parse(message.data);
                setHumedad(data.data);
                // Aquí puedes actualizar el estado de React con los datos recibidos
            };

            return () => {
                client.close();
            };

        }

        const webSocketTemperatura = () => {
            const wsUrl = 'ws://192.168.1.7:8000/ws/temperature';
            const client = (new W3CWebSocket(wsUrl)); // Use native WebSocket

            client.onopen = () => {
                console.log('Conexión WebSocket abierta');
            };

            client.onmessage = (message) => {
                const data = JSON.parse(message.data);
                setTemperatura(data.data);
                // Aquí puedes actualizar el estado de React con los datos recibidos
            };

            return () => {
                client.close();
            };

        }
        webSocketHumedad();
        webSocketTemperatura();
        
    }, [temperatura, humedad]);




    /*const createConnection = () => {
        const wsUrl = 'ws://192.168.100.133:8000/ws/LED';
        setClient(new W3CWebSocket(wsUrl));

        client.onopen = () => {
            console.log('Conexión WebSocket abierta');
             // Send data as JSON string
        };
        
        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setTemperatura(data.data);
            // Aquí puedes actualizar el estado de React con los datos recibidos
        };
        client.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };
        client.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    }

    const closeConnection = () => {
        client.close();
    }*/

    const sendDataToWebSocket = (data) => {
        clientLED.send(JSON.stringify(data));
    };

    const handleFocoClick = () => {
        setFocoEncendido(!focoEncendido);
        if (!focoEncendido) {
            setShowFocoDialog(true);
            setTimeout(() => {
                setFocoEncendido(false);
            }, 1000);
        }
    };

    const handleVentiladorClick = () => {
        setVentiladorEncendido(!ventiladorEncendido);
        if (ventiladorEncendido) {
            setCircleColor('#ccc');
        } else {
            setCircleColor('green');
        }
    };

    const handleCloseFocoDialog = () => {
        setShowFocoDialog(false);
    };

    const handleSensorTemperaturaClick = () => {
        setSensorTemperatura(!sensorTemperatura);
        if (!sensorTemperatura) {
            setShowSensorDialog(true);
        } else {
            setShowSensorDialog(false);
        }
    };

    const handleCloseSensorDialog = () => {
        setShowSensorDialog(false);
        setSensorTemperatura(false); 
    };

    const handleChangeIntensidadFoco = (event, newValue) => {
        setIntensidadFoco(newValue);
        sendDataToWebSocket('G'+newValue);
    };

    return (
        <div className="Control">
            <button className="back-button" onClick={() => window.history.back()}>←</button>
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
                            onClick={handleVentiladorClick}
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
                            onClick={handleSensorTemperaturaClick}
                        >
                            {sensorTemperatura ? 'Detener sensor de temperatura' : 'Prender sensor de temperatura'}
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                    </motion.div>
                </div>
            </Container>
            <Dialog open={showFocoDialog} onClose={handleCloseFocoDialog}>
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
                    <Button onClick={handleCloseFocoDialog} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showSensorDialog} onClose={handleCloseSensorDialog}>
                <DialogTitle>Información del Sensor</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="subtitle1">Temperatura: {temperatura} °C</Typography>
                    <Typography variant="subtitle1">Humedad: {humedad} %</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSensorDialog} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Control;
