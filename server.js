// j'importe le module Express (framework backend )
const express = require('express');

// j'importe le module dotenv pour charger les variables d'environnement
// dotenv est un module qui permet de charger les variables d'environnement à partir d'un fichier .env
require('dotenv').config();

// j'initialise une application Express
const app = express();

// je définit le port d'écoute (ici 3000 en dur, mais je pourrait utiliser process.env.PORT)
const PORT = 3000;

// Middleware qui permet à Express de parser automatiquement les corps de requête en JSON
app.use(express.json());

// j'importe les routes définies dans app/routes/userRoutes.js
const userRoutes = require('./app/routes/userRoutes');


// 🔐 Mitigation sécurité contre l'injection de lien HTTP (res.set('Link'))
const { sanitizeHeader } = require('./utils/sanitize');

app.use((req, res, next) => {
  const originalSet = res.set.bind(res);

  res.set = (field, value) => {
    if (field.toLowerCase() === 'link') {
      return originalSet(field, sanitizeHeader(value));
    }
    return originalSet(field, value);
  };

  next();
});


// je dit à Express que toutes les routes définies dans userRoutes seront préfixées par /api/users
// Exemple : POST /api/users/register
app.use('/api/users', userRoutes);


// Route de vérification du statut
app.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime().toFixed(0) + 's' });
});


// je démarre le serveur Express, et j'affiche un message dans le terminal pour confirmer (et export d'app pour test)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
}

app.get('/', (req, res) => {
  res.send('API backend-diary opérationnelle ');
});

require('./swagger')(app);

module.exports = app;
