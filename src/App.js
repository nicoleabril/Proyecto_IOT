import React, { useState } from 'react';
import './assets/styles/App.css';

const App = () => {
  const [focoEncendido, setFocoEncendido] = useState(false);
  const [ventiladorEncendido, setVentiladorEncendido] = useState(false);
  const [otraActividadEncendida, setOtraActividadEncendida] = useState(false);

  return (
    <div className="App">
      <h1>Control de Actividades</h1>
      <div className="container">
        <button onClick={() => setFocoEncendido(!focoEncendido)}>
          {focoEncendido ? 'Apagar Foco' : 'Prender Foco'}
        </button>
        <button onClick={() => setVentiladorEncendido(!ventiladorEncendido)}>
          {ventiladorEncendido ? 'Apagar Ventilador' : 'Prender Ventilador'}
        </button>
        <button onClick={() => setOtraActividadEncendida(!otraActividadEncendida)}>
          {otraActividadEncendida ? 'Apagar sensor de temperatura' : 'Prender sensor de temperatura'}
        </button>
      </div>
      <div className="animaciones">
        <div className={`foco ${focoEncendido ? 'encendido' : ''}`}></div>
        <div className={`ventilador ${ventiladorEncendido ? 'encendido' : ''}`}></div>
        <div className={`otra-actividad ${otraActividadEncendida ? 'encendido' : ''}`}></div>
      </div>
    </div>
  );
}

export default App;
