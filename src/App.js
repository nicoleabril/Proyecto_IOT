import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Control from './pages/Control.js';
import Home from "./pages/Home.js";
import './assets/styles/app.css';
function App () {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ControlActividades" element={<Control />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
