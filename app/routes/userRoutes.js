//  J'importe Express pour gérer le routage
const express = require('express');
const router = express.Router();

//  J'importe toutes les fonctions du contrôleur utilisateur
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  exportProfile // Route d’export RGPD
} = require('../controllers/userController');

//  Middlewares de sécurité
const auth = require('../middlewares/auth');             // Vérifie le token JWT
const requireAdmin = require('../middlewares/requireAdmin'); // Vérifie le rôle admin

//  ========== AUTHENTIFICATION (public) ==========

router.post('/register', register);
router.post('/login', login);

//  ========== UTILISATEUR CONNECTÉ ==========

router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);
router.delete('/me', auth, deleteProfile);
router.get('/me/export', auth, exportProfile); //  Route d’export RGPD

//  ========== ADMIN UNIQUEMENT ==========

router.get('/users', auth, requireAdmin, getAllUsers);

//  ========== CONSENTEMENT (public) ==========
const { saveConsent } = require('../controllers/consentController');
router.post('/consent', auth, saveConsent);


//  J'exporte le routeur pour l'utiliser dans server.js
module.exports = router;
