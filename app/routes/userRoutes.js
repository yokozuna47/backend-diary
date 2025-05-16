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
  getAllUsers
} = require('../controllers/userController');

//  Middlewares de sécurité
const auth = require('../middlewares/auth');             // Vérifie le token JWT
const requireAdmin = require('../middlewares/requireAdmin'); // Vérifie le rôle admin

//  ========== AUTHENTIFICATION (public) ==========
router.post('/register', register); // Inscription
router.post('/login', login);       // Connexion

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT retourné
 */


//  ========== UTILISATEUR CONNECTÉ ==========
router.get('/me', auth, getProfile);           // Voir son profil
router.put('/me', auth, updateProfile);        // Modifier son profil
router.delete('/me', auth, deleteProfile);     // Supprimer son compte

//  ========== ADMIN UNIQUEMENT ==========
router.get('/', auth, requireAdmin, getAllUsers); // Voir tous les utilisateurs
router.get('/admin-only', auth, requireAdmin, (req, res) => {
  res.json({ message: 'Bienvenue administrateur ' });
});

//  J'exporte le routeur pour l'utiliser dans server.js
module.exports = router;
