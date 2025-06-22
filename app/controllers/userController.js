const jwt = require('jsonwebtoken');

// J'importe les fonctions de service liées aux utilisateurs
const {
  findUserByEmail,
  createUser,
  verifyPassword,
  getAllUsers: getAllUsersFromService
} = require('../services/userService');

// ======================
//  INSCRIPTION
// ======================
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email déjà utilisé' });
    }

    // Crée le nouvel utilisateur
    const user = await createUser({ firstName, lastName, email, password });
    res.status(201).json({ message: 'Utilisateur créé', userId: user.id });

  } catch (error) {
    // Gère le cas où l'email est déjà pris malgré tout
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }

    console.error("Erreur d'inscription :", error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ======================
//  CONNEXION
// ======================
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche l'utilisateur
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Vérifie le mot de passe
    const isPasswordValid = await verifyPassword(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Crée le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Connexion réussie', token });

  } catch (error) {
    console.error('Erreur de connexion :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ======================
//  PROFIL UTILISATEUR
// ======================
const getProfile = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur /me :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ======================
//  MISE À JOUR PROFIL
// ======================
const updateProfile = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Met à jour les infos si elles sont fournies
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();
    res.json({ message: 'Profil mis à jour', user });

  } catch (error) {
    console.error('Erreur update :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ======================
//  SUPPRESSION DE COMPTE
// ======================
const deleteProfile = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.destroy();
    res.json({ message: 'Compte supprimé' });

  } catch (error) {
    console.error('Erreur suppression :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ======================
//  ADMIN - LISTE USERS
// ======================
const getAllUsers = async (_req, res) => {
  try {
    const users = await getAllUsersFromService();
    res.json({ users });
  } catch (error) {
    console.error('Erreur admin /users :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ======================
//  EXPORT /me/export
// ======================
const exportProfile = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const exportData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    // Déclenche un téléchargement JSON
    res.setHeader('Content-Disposition', 'attachment; filename=export.json');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(exportData);

  } catch (error) {
    console.error('Erreur export profil :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

//  J'exporte toutes les fonctions
module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  exportProfile 
};
