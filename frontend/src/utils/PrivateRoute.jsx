import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Composant de protection de route
export default function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  // Si pas connecté → redirection vers /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si route réservée aux admins et utilisateur ≠ admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/me" replace />;
  }

  // Si tout est ok → on affiche le composant enfant
  return children;
}
