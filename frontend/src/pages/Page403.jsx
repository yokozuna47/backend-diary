import React from "react";
import { Link } from "react-router-dom";

function Page403() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Accès interdit</h2>
      <p className="text-gray-600 mb-6">
        Vous n’avez pas les droits nécessaires pour accéder à cette page.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default Page403;
