import React from 'react';
import '../assets/styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">Proyecto IoT</h1>
      <p className="subtitle">Sistemas Distribuidos</p>
      <a href="/ControlActividades"><button className="try-button">Probar</button></a>
    </div>
  );
}

export default Home;
