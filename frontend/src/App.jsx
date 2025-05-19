import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Me from './pages/Me';
import Register from './pages/Register';
import Login from "./pages/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Page non trouvée</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<Me />} />
      </Routes>
    </Router>
  );
}

export default App;
