require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());

// Limite de requêtes (contre-pression)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limite chaque IP à 100 requêtes
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Test route
app.get('/', (req, res) => {
  res.send('API backend-diary opérationnelle ✅');
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
