// utils/sanitize.js

// Fonction simple qui nettoie les caractères dangereux d’un header
// Ex : <, >, `, ", ' → souvent utilisés pour injecter du contenu dans les entêtes
// pour Node.js avec require
function sanitizeHeader(value) {
  return value.replace(/[`'"<>]/g, '');
}

module.exports = { sanitizeHeader };
