import React from 'react';
import { Link } from 'react-router-dom';

export default function ListePartenaires() {
  const partenaires = [
    {
      nom: 'Google',
      finalite: 'Mesure d’audience',
      lien: 'https://policies.google.com/privacy',
    },
    {
      nom: 'Meta (Facebook)',
      finalite: 'Publicité personnalisée',
      lien: 'https://www.facebook.com/policy.php',
    },
    {
      nom: 'Cloudflare',
      finalite: 'Sécurité et performances web',
      lien: 'https://www.cloudflare.com/privacypolicy/',
    },
    {
      nom: 'Hotjar',
      finalite: 'Analyse de navigation',
      lien: 'https://www.hotjar.com/legal/policies/privacy/',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6">Nos partenaires</h1>

      <p className="mb-6 text-sm">
        Nous collaborons avec des partenaires technologiques pour vous offrir une meilleure expérience, des contenus personnalisés
        et des publicités pertinentes. Voici la liste de nos partenaires.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Nom</th>
              <th className="px-4 py-2 border">Finalité</th>
              <th className="px-4 py-2 border">Politique de confidentialité</th>
            </tr>
          </thead>
          <tbody>
            {partenaires.map((p, i) => (
              <tr key={i} className="text-sm text-center">
                <td className="px-4 py-2 border font-medium">{p.nom}</td>
                <td className="px-4 py-2 border">{p.finalite}</td>
                <td className="px-4 py-2 border">
                  <a
                    href={p.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Voir la politique
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Liste mise à jour le 18/06/2025. Cette page est régulièrement révisée pour refléter nos relations avec les partenaires.
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="text-blue-600 underline text-sm"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
