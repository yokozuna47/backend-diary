const { body, validationResult } = require('express-validator');

exports.validateRegister = [
  body('firstName').notEmpty().withMessage('Prenom requis'),
  body('lastName').notEmpty().withMessage('Nom requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 8 }).withMessage('Mot de passe trop court'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
