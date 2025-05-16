const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Je récupère le token dans l'en-tête Authorization : "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant ou mal formé' });
    }

    const token = authHeader.split(' ')[1]; // je récupère juste la valeur du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // je vérifie le token

    // Je stocke les infos de l'utilisateur dans req.user pour les utiliser plus tard
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};
