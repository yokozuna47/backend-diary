import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Me from "./pages/Me";
import AdminPanel from "./pages/AdminPanel";
import Page403 from "./pages/Page403";
import CookieModal from "./components/CookieModal"; // Bannière RGPD
import { AuthProvider } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import CookiePolicyPage from "./pages/CookiePolicyPage"; // Page RGPD

function App() {
  return (
    <AuthProvider>
      <Router>
        <CookieModal /> {/* Affiche la bannière RGPD */}
        <Navbar />
        <Routes>
          {/* Pages publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Pages privées */}
          <Route
            path="/me"
            element={
              <PrivateRoute>
                <Me />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Pages RGPD */}
          <Route path="/politique-confidentialite" element={<CookiePolicyPage />} />

          {/* Autres */}
          <Route path="/403" element={<Page403 />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
