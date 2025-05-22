import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

// Création du contexte d'authentification global
const AuthContext = createContext();

// Fournisseur du contexte : englobe toute l'appli
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Effet au démarrage pour vérifier le token
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      console.warn("⛔ Token expiré");
      localStorage.removeItem("token");
      setUser(null);
      return;
    }

    setUser(decoded);

    // ⏰ Auto logout programmé à l'expiration
    const timeLeft = (decoded.exp - now) * 1000;
    const timeout = setTimeout(() => {
      console.warn("⏰ Token expiré automatiquement");
      localStorage.removeItem("token");
      setUser(null);
    }, timeLeft);

    return () => clearTimeout(timeout); // nettoyage si component unmounted
  } catch (err) {
    console.error("Token invalide", err);
    localStorage.removeItem("token");
    setUser(null);
  }
}, []);

// Effet pour supprimer le token à la fermeture de l'onglet
useEffect(() => {
  const handleUnload = () => {
    localStorage.removeItem("token"); // Supprime le token à la fermeture onglet
  };

  window.addEventListener("beforeunload", handleUnload);
  return () => window.removeEventListener("beforeunload", handleUnload);
}, []);


  // Déconnexion sécurisée
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);
