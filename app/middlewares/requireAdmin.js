// Ce middleware vérifie si l'utilisateur est un "admin"

module.exports = (req, res, next) => {
  // Si le rôle de l'utilisateur connecté N'EST PAS "admin"
  if (req.user.role !== 'admin') {
    // Alors on lui interdit l'accès avec un message d'erreur
    return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
  }

  // Sinon, tout est bon → on passe au traitement suivant
  next();
};
