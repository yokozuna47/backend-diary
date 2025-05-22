import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Barre de navigation principale affichée en haut du site
export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Si token présent, on récupère les infos de l’utilisateur (prénom, rôle, etc.)
  let userInfo = null;
  if (token) {
    try {
      userInfo = jwtDecode(token);
    } catch (error) {
      console.error("Token invalide :", error);
      localStorage.removeItem("token");
    }
  }

  // Fonction déclenchée à la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="flex items-center space-x-4">
        <h1 className="font-bold text-xl text-blue-400">📘 Diary App</h1>
        <Link to="/" className="hover:underline">Accueil</Link>
        {userInfo && (
          <>
            <Link to="/me" className="hover:underline">Mon profil</Link>
            {userInfo.role === "admin" && (
              <Link to="/admin" className="hover:underline">Admin</Link>
            )}
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {userInfo ? (
          <>
            <span className="text-sm text-gray-300">
              Bienvenue <strong>{userInfo.email.split("@")[0]}</strong> ({userInfo.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition">Connexion</Link>
        )}
      </div>
    </nav>
  );
}
