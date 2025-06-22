const express = require('express');
const router = express.Router();

// ===============================
//  POST /api/consent
// ===============================
router.post('/', (req, res) => {
  const { consentGiven } = req.body;

  // Vérifie que la valeur envoyée est bien un booléen (true ou false)
  if (typeof consentGiven !== 'boolean') {
    return res.status(400).json({ error: 'Valeur de consentement invalide' });
  }

  // Enregistre le choix de l'utilisateur dans un cookie
  res.cookie('userConsent', consentGiven ? 'true' : 'false', {
    maxAge: 365 * 24 * 60 * 60 * 1000, // Durée : 1 an
    httpOnly: false, // Accessible par le frontend (car affiché)
    secure: process.env.NODE_ENV === 'production', // En prod, le cookie ne sera envoyé que via HTTPS
    sameSite: 'Lax' // Protection CSRF minimale mais compatible
  });

  // Répond au frontend que tout s’est bien passé
  res.status(200).json({ message: 'Consentement enregistré' });
});

// Export du routeur
module.exports = router;
