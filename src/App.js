import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Control from './pages/Control.js';
function App () {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/ControlActividades" element={<Control />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
