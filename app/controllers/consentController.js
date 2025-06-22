// J'importe le modèle Consent défini dans Sequelize
const { Consent } = require('../../models');

// ============================
//  POST /api/consent
// ============================
const saveConsent = async (req, res) => {
  try {
    // Je récupère les préférences de l'utilisateur depuis la requête
    const { tracking, analytics, marketing } = req.body;

    // Je crée ou mets à jour les préférences de consentement
    const consent = await Consent.upsert({
      userId: req.user.userId, // L'utilisateur est identifié via le token
      tracking,
      analytics,
      marketing
    });

    // Réponse de succès
    res.status(200).json({ message: 'Préférences de consentement sauvegardées.' });

  } catch (error) {
    console.error('Erreur lors de l’enregistrement du consentement :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// J'exporte la fonction pour l'utiliser dans les routes
module.exports = { saveConsent };
