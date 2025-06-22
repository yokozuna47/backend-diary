const express = require('express');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 3000;

// Sécurité HTTP headers, CORS, cookies et rate limiting

app.use(helmet()); // Ajoute des headers de protection
app.use(cors());   // Autorise CORS par défaut
app.use(cookieParser());
app.use(express.json());

// Protection bruteforce (ex: sur /login et /register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requêtes par IP
  message: 'Trop de tentatives, réessayez plus tard.'
});

// S'applique uniquement à ces routes :
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);

// Mitigation injection de liens HTTP
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

// Routes principales
const userRoutes = require('./app/routes/userRoutes');
app.use('/api/users', userRoutes);

// Routes de consentement
const consentRoutes = require('./app/routes/consentRoutes');
app.use('/api/consent', consentRoutes);

// Route de monitoring
app.get('/status', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime().toFixed(0) + 's' });
});

// Gestion de cookies
app.get('/cookies', (req, res) => {
  res.cookie('testCookie', 'testValue', {
    maxAge: 900000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.send('Cookie créé avec succès !');
});

app.get('/cookies/read', (req, res) => {
  const testCookie = req.cookies.testCookie;
  res.send(`Valeur du cookie : ${testCookie}`);
});

// Swagger
require('./swagger')(app);

// Home
app.get('/', (req, res) => {
  res.send('API backend-diary opérationnelle ');
});

// Lancer le serveur sauf en test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
}

module.exports = app;
