import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function CookieModal() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const [preferences, setPreferences] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const cookies = Object.fromEntries(
      (document.cookie ? document.cookie.split('; ') : []).map((c) => {
        const [k, ...v] = c.split('=');
        return [k, decodeURIComponent(v.join('='))];
      })
    );
    if (!cookies.userConsent) {
      setShowBanner(true);
    } else {
      try {
        const parsed = JSON.parse(cookies.userConsent);
        if (parsed.preferences) loadPreferencesScripts();
        if (parsed.statistics) loadStatisticsScripts();
        if (parsed.marketing) loadMarketingScripts();
        setPreferences(!!parsed.preferences);
        setStatistics(!!parsed.statistics);
        setMarketing(!!parsed.marketing);
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const setConsentCookie = (value) => {
    const payload = typeof value === 'string'
      ? { preferences: value === 'accepted', statistics: value === 'accepted', marketing: value === 'accepted', status: value }
      : value;
    const consent = { ...payload, uuid: uuidv4(), timestamp: new Date().toISOString() };
    document.cookie = `userConsent=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Strict; Secure`;
    sendConsentToBackend(consent);
    if (
      (typeof value === 'string' && value === 'accepted') ||
      (typeof value === 'object' && (value.preferences || value.statistics || value.marketing))
    ) {
      if (payload.preferences) loadPreferencesScripts();
      if (payload.statistics) loadStatisticsScripts();
      if (payload.marketing) loadMarketingScripts();
    }
    setShowBanner(false);
    setShowPanel(false);
  };

  const authorizeSelection = () => {
    const selection = {
      preferences,
      statistics,
      marketing,
    };
    console.log('[RGPD] Autorisation partielle :', selection);
    setConsentCookie(selection);
  };

  const sendConsentToBackend = (value) => {
    fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: value, userAgent: navigator.userAgent, ip: 'auto' }),
    });
  };

  const loadPreferencesScripts = () => {
    console.log('[RGPD] Chargement des scripts de préférences');
    const lang = document.documentElement.lang || 'fr';
    document.documentElement.setAttribute('lang', lang);
  };

  const loadStatisticsScripts = () => {
    console.log('[RGPD] Chargement des scripts statistiques');
    const gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
    gtagScript.async = true;
    document.head.appendChild(gtagScript);
  };

  const loadMarketingScripts = () => {
    console.log('[RGPD] Chargement des scripts marketing autorisé');
    const marketingPixel = document.createElement('script');
    marketingPixel.src = 'https://example.com/pixel.js';
    marketingPixel.async = true;
    document.head.appendChild(marketingPixel);
  };

  useEffect(() => {
    window.showCookieSettings = () => {
      console.log('[RGPD] Affichage du panneau de gestion des cookies');
      setShowPanel(true);
    };
  }, []);

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-4 right-4 z-50 bg-white text-sm shadow-xl rounded-lg border max-w-sm w-full animate-fade-in">
          <div className="p-4">
            <h2 className="font-semibold mb-2">Nous utilisons des cookies</h2>
            <p className="text-gray-700 text-xs mb-3">
              Nous et nos partenaires utilisons des cookies pour assurer le bon fonctionnement du site, mesurer l'audience,
              vous proposer des services personnalisés et afficher des annonces pertinentes.
            </p>
            <div className="flex justify-end gap-2 text-sm">
              <button className="text-blue-600 underline" onClick={() => setShowPanel(true)}>
                Plus d'options
              </button>
              <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300" onClick={() => setConsentCookie('refused')}>
                Tout refuser
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => setConsentCookie('accepted')}>
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      )}

      {showPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white p-6 w-full sm:w-[400px] shadow-lg overflow-y-auto text-sm border-l animate-slide-in relative" role="dialog" aria-modal="true">
            <h2 className="text-xl font-bold mb-4">Paramètres de personnalisation et cookies</h2>

            <div className="space-y-4">
              <div className="border p-4 rounded">
                <h3 className="font-semibold text-base mb-1">Personnalisation de la recherche</h3>
                <p className="text-gray-700 text-xs mb-2">Recevez des résultats et recommandations plus pertinents en fonction de votre activité passée sur Google ou ce site.</p>
                <div className="flex gap-4">
                  <button
                    className={`px-3 py-1 rounded border ${preferences ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setPreferences(true)}
                  >Activer</button>
                  <button
                    className={`px-3 py-1 rounded border ${!preferences ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setPreferences(false)}
                  >Désactiver</button>
                </div>
              </div>

              <div className="border p-4 rounded">
                <h3 className="font-semibold text-base mb-1">Statistiques</h3>
                <p className="text-gray-700 text-xs mb-2">Mesurez l'audience, comprenez comment les visiteurs interagissent avec le site de manière anonyme.</p>
                <div className="flex gap-4">
                  <button
                    className={`px-3 py-1 rounded border ${statistics ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setStatistics(true)}
                  >Activer</button>
                  <button
                    className={`px-3 py-1 rounded border ${!statistics ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setStatistics(false)}
                  >Désactiver</button>
                </div>
              </div>

              <div className="border p-4 rounded">
                <h3 className="font-semibold text-base mb-1">Publicité personnalisée</h3>
                <p className="text-gray-700 text-xs mb-2">Afficher des annonces en fonction de votre navigation. Ces cookies aident à personnaliser le contenu publicitaire.</p>
                <div className="flex gap-4">
                  <button
                    className={`px-3 py-1 rounded border ${marketing ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setMarketing(true)}
                  >Activer</button>
                  <button
                    className={`px-3 py-1 rounded border ${!marketing ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => setMarketing(false)}
                  >Désactiver</button>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 border-t pt-3">
              Déclaration relative aux cookies mise à jour le 18/06/2025 par IVT — Responsable du traitement : IVT, France. <br />
              Vous pouvez modifier vos paramètres à tout moment en cliquant sur l'icône "Cookies" en bas de page. <br />
              <Link to="/politique-confidentialite" className="underline text-blue-600">Politique de confidentialité</Link>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setConsentCookie('accepted')}>
                Tout accepter
              </button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100" onClick={authorizeSelection}>
                Confirmer vos paramètres
              </button>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200" onClick={() => setConsentCookie('refused')}>
                Tout refuser
              </button>
            </div>

            <button
              onClick={() => setShowPanel(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowPanel(true)}
        className="fixed bottom-4 left-4 z-40 bg-blue-600 text-white text-xs px-3 py-2 rounded shadow-lg hover:bg-blue-700 animate-bounce"
        aria-label="Gérer mes cookies"
      >
        Gérer mes cookies
      </button>
    </>
  );
}
