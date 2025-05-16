// J’importe le modèle Sequelize "User" depuis le dossier models
const { User } = require('../../models');

// J’importe la bibliothèque "argon2" pour hasher les mots de passe
const argon2 = require('argon2');

// J’importe la lib jsonwebtoken pour créer le token JWT lors du login
const jwt = require('jsonwebtoken');

// =====================================
// Fonction d'inscription (REGISTER)
// =====================================
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email déjà utilisé' });
    }

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', userId: user.id });

  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// =====================================
// Fonction de connexion (LOGIN)
// =====================================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      // Je crée un token JWT avec l'ID de l'utilisateur et son email
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Connexion réussie', token });

  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// =====================================
// Fonction de profil (GET /me)
// =====================================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'firstName', 'lastName', 'email']
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erreur /me :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


// =====================================
// Fonction de mise à jour du profil (PUT /me)
// =====================================
exports.updateProfile = async (req, res) => {
  // Je récupère les nouvelles valeurs que l'utilisateur veut modifier
  const { firstName, lastName, email } = req.body;

  try {
    // Je cherche l'utilisateur dans la base grâce à l'ID contenu dans le token JWT
    const user = await User.findByPk(req.user.userId);

    // Si l'utilisateur n'existe pas, je renvoie une erreur
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Je mets à jour seulement les champs qui ont été fournis (si non fournis, je garde l'ancien)
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    // Je sauvegarde les modifications dans la base de données
    await user.save();

    // Je renvoie une réponse de succès avec le nouvel objet utilisateur
    res.json({ message: 'Profil mis à jour', user });

  } catch (error) {
    // En cas d'erreur, je log et je renvoie une erreur serveur
    console.error('Erreur lors de la mise à jour :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


// =====================================
// Fonction de suppression du compte (DELETE /me)  (pour que le user puisse supprimer son compte)
// =====================================
exports.deleteProfile = async (req, res) => {
  try {
    // Je cherche l’utilisateur connecté grâce à son ID (présent dans le token JWT)
    const user = await User.findByPk(req.user.userId);

    // Si aucun utilisateur n’est trouvé, je renvoie une erreur
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Je supprime cet utilisateur de la base de données
    await user.destroy();

    // Je renvoie un message de confirmation
    res.json({ message: 'Compte utilisateur supprimé avec succès' });

  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// =====================================
// Route admin : récupérer tous les utilisateurs
// =====================================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'], // pas de password
      order: [['id', 'ASC']]
    });

    res.json({ users });
  } catch (error) {
    console.error('Erreur /users :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
