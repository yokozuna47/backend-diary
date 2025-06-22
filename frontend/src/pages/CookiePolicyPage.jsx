// src/pages/CookiePolicyPage.jsx
import React from 'react';

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Politique de confidentialité et cookies</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement est IVT, basé en France. Pour toute question relative à vos données personnelles,
          vous pouvez nous contacter via notre formulaire de contact.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">2. Finalités du traitement</h2>
        <ul className="list-disc list-inside">
          <li>Assurer le bon fonctionnement du site</li>
          <li>Mesurer l'audience</li>
          <li>Personnaliser le contenu et les publicités</li>
          <li>Proposer des fonctionnalités liées aux réseaux sociaux</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">3. Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez des droits suivants : accès, rectification, effacement, opposition, portabilité,
          et limitation du traitement. Vous pouvez également retirer votre consentement à tout moment.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">4. Cookies utilisés</h2>
        <ul className="list-disc list-inside">
          <li>Cookies nécessaires : assurent les fonctions de base du site (toujours actifs)</li>
          <li>Cookies de préférences : conservent vos préférences (langue, région)</li>
          <li>Cookies statistiques : analysent la fréquentation du site</li>
          <li>Cookies marketing : personnalisent les publicités affichées</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">5. Durée de conservation</h2>
        <p>
          Les cookies sont conservés pendant 12 mois maximum. Le consentement est renouvelé automatiquement après cette période.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">6. Liste des partenaires</h2>
        <p>
          Une liste actualisée de nos partenaires est disponible via le lien : <strong><a className="text-blue-600 underline" href="/liste-partenaires">Liste des partenaires</a></strong>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">7. Réclamation</h2>
        <p>
          En cas de litige, vous pouvez saisir la CNIL (Commission Nationale de l'Informatique et des Libertés) sur <a className="text-blue-600 underline" href="https://www.cnil.fr">www.cnil.fr</a>
        </p>
      </section>
    </div>
  );
}
