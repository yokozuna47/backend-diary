# 📘 Projet : Intégration et Sécurisation d'une Base de Données (backend-diary)

## 🧩 Description

Ce projet a pour objectif de créer un backend Node.js sécurisé pour gérer des utilisateurs via une API REST. Il intègre une base de données PostgreSQL, un système d'authentification JWT, une gestion des rôles (`user`, `admin`) et des protections classiques (rate-limiting, headers de sécurité, validation d’entrées).

## 🚀 Stack technique

* Node.js + Express
* PostgreSQL (via Docker)
* Sequelize ORM
* JWT (jsonwebtoken)
* Argon2 (hachage sécurisé des mots de passe)
* express-validator
* Helmet, CORS, Rate-limit

## 🔐 Fonctionnalités principales

* Inscription / Connexion avec token JWT
* Middleware d'authentification (`auth.js`)
* Middleware de rôle admin (`requireAdmin.js`)
* Gestion du profil utilisateur :

  * `GET /me`
  * `PUT /me`
  * `DELETE /me`
* Liste des utilisateurs réservée aux admins : `GET /api/users`

## 🛠 Installation

```bash
# Cloner le dépôt
$ git clone <lien-du-repo>
$ cd backend-diary

# Installer les dépendances
$ npm install

# Créer un fichier .env
$ cp .env.example .env
# Modifier avec vos valeurs
```

## 🐘 Base de données

* PostgreSQL est déployé via Docker avec persistance
* Le modèle "User" contient :

  * `id`, `firstName`, `lastName`, `email`, `password`, `role`
* Migrations Sequelize utilisées pour la structure

## 📮 API REST

### Authentification

* `POST /api/users/register` → Créer un compte
* `POST /api/users/login` → Obtenir un token JWT

### Utilisateur connecté

* `GET /api/users/me` → Voir son profil
* `PUT /api/users/me` → Modifier son profil
* `DELETE /api/users/me` → Supprimer son compte

### Admin

* `GET /api/users` → Voir tous les utilisateurs
* `GET /api/users/admin-only` → Test d'accès admin

## ✅ Sécurité mise en place

* Hash mot de passe avec `argon2id`
* JWT stocké dans les en-têtes Authorization
* Protection des routes sensibles par middleware
* Validation des champs avec `express-validator`
* Headers de sécurité avec `helmet`
* CORS configuré
* Contre-pression avec `express-rate-limit`

## 🧪 Tests

* Toutes les routes sont testées avec Postman
* Export Postman à venir

## 📦 Bonus possibles

* Route PATCH /users/\:id/promote (promotion admin)
* Tests automatisés avec Jest
* Intégration CI/CD avec GitHub Actions
* Swagger pour documentation API

## 👤 Auteur

* Nom : \[Ton nom ici]
* Projet encadré dans le cadre de la formation \[Nom de l'école ou programme]
