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

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT retourné
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', login);

//  ========== UTILISATEUR CONNECTÉ ==========

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtenir le profil de l’utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Données utilisateur
 *       401:
 *         description: Non authentifié
 */
router.get('/me', auth, getProfile);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Mettre à jour son profil
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil mis à jour
 *       401:
 *         description: Non authentifié
 */
router.put('/me', auth, updateProfile);

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: Supprimer son propre compte
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Compte supprimé
 *       401:
 *         description: Non authentifié
 */
router.delete('/me', auth, deleteProfile);

//  ========== ADMIN UNIQUEMENT ==========

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs (admin uniquement)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       403:
 *         description: Accès interdit
 */
router.get('/users', auth, requireAdmin, getAllUsers);

//  J'exporte le routeur pour l'utiliser dans server.js
module.exports = router;
