import React, { useState, useEffect } from 'react';
import '../assets/styles/Home.css';
import Confetti from 'react-confetti';



const Home = () => {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
        setShowConfetti(prev => !prev);
        }, 5000); // Alterna cada 5 segundos

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, []);


  return (
    <div className="home-container">
        {showConfetti && <Confetti />}
        <h1 className="title">Proyecto IoT</h1>
        <p className="subtitle">Sistemas Distribuidos</p>
        <a href="/ControlActividades"><button className="try-button">Probar</button></a>
    </div>
  );
}

export default Home;
