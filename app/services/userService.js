const { User } = require('../../models');
const argon2 = require('argon2');

//  Recherche un utilisateur par email
async function findUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

//  Crée un nouvel utilisateur avec hash sécurisé
async function createUser({ firstName, lastName, email, password }) {
  const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
}

//  Vérifie le mot de passe
async function verifyPassword(hashedPassword, plainPassword) {
  return await argon2.verify(hashedPassword, plainPassword);
}

module.exports = {
  findUserByEmail,
  createUser,
  verifyPassword,
};
