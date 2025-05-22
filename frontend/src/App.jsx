import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Me from "./pages/Me";
import AdminPanel from "./pages/AdminPanel";
import Page403 from './pages/Page403';

import { AuthProvider } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>

          {/* 🔓 Pages accessibles publiquement */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Page protégée par token */}
          <Route
            path="/me"
            element={
              <PrivateRoute>
                <Me />
              </PrivateRoute>
            }
          />

          {/*  Page admin uniquement */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Optionnel : redirection vers login par défaut */}
          <Route path="*" element={<Login />} />
          <Route path="/403" element={<Page403 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
