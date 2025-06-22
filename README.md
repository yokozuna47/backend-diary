# 📘 Projet : Intégration et Sécurisation d'une Base de Données (backend-diary)

[![CI Tests](https://github.com/yokozuna47/backend-diary/actions/workflows/test.yml/badge.svg)](https://github.com/yokozuna47/backend-diary/actions)

## 🧩 Description
Ce projet a pour objectif de créer un backend Node.js sécurisé pour gérer des utilisateurs via une API REST. Il intègre une base de données PostgreSQL, un système d'authentification JWT, une gestion des rôles (`user`, `admin`) et des protections classiques (rate-limiting, headers de sécurité, validation d’entrées).

🍪 Bannière de consentement RGPD-Compliant

L’application frontend intègre une bannière de gestion des cookies conforme au RGPD, avec :

     Consentement explicite avant chargement des cookies facultatifs

     Refus possible aussi simple que l’acceptation (Tout refuser)

     Choix granulaire : Préférences, Statistiques, Marketing

     Conservation des choix pendant 12 mois

     Lien vers la Politique de confidentialité

     Icône flottante “Gérer mes cookies” (modifiable à tout moment)

     Scripts (analytics, préférences, pub) chargés uniquement après consentement

     Envoi sécurisé du consentement au backend (/api/consent) avec UUID horodaté

     Accessibilité : role="dialog", focus conservé, contraste élevé

     Animations douces : fade-in / slide-in (config Tailwind)

## Stack technique :

-  **Backend** : Node.js + Express
-  **Base de données** : PostgreSQL + Sequelize ORM
-  **Frontend** : React + Vite + TailwindCSS
-  **Conteneurisation** : Docker + docker-compose
-  **Infrastructure as Code** : Terraform (réseau + conteneurs)
-  **Auth** : JWT + Argon2id (bcrypt interdit)
-  **Tests** : Jest + Supertest (CI via GitHub Actions)
-  **Documentation API** : Swagger (auto-générée)
-  **Sécurité** : Helmet, CORS, Rate-limit, Express-validator, sanitizeHeader()


## 🔐 Fonctionnalités principales
- Inscription / Connexion avec token JWT
- Middleware d'authentification (`auth.js`)
- Middleware de rôle admin (`requireAdmin.js`)
- Gestion du profil utilisateur :
  - `GET /me`
  - `PUT /me`
  - `DELETE /me`
- Liste des utilisateurs réservée aux admins : `GET /api/users`
- Interface frontend avec pages sécurisées (register, login, me, admin)


### 🔓 Utilisateur anonyme
- `POST /api/users/register` → Inscription (mot de passe hashé Argon2id)
- `POST /api/users/login` → Connexion (JWT sécurisé)

### 🔐 Utilisateur connecté (token JWT)
- `GET /api/users/me` → Voir son profil
- `PUT /api/users/me` → Modifier son profil
- `DELETE /api/users/me` → Supprimer son compte

### 👑 Admin uniquement
- `GET /api/users` → Voir tous les utilisateurs



## 🐘 Base de données
- PostgreSQL est déployé via Docker avec persistance
- Le modèle "User" contient :
  - `id`, `firstName`, `lastName`, `email`, `password`, `role`
- Migrations Sequelize utilisées pour la structure

## 📮 API REST

### Authentification
- `POST /api/users/register` → Créer un compte
- `POST /api/users/login` → Obtenir un token JWT

### Utilisateur connecté
- `GET /api/users/me` → Voir son profil
- `PUT /api/users/me` → Modifier son profil
- `DELETE /api/users/me` → Supprimer son compte

### Admin
- `GET /api/users` → Voir tous les utilisateurs
- `GET /api/users/admin-only` → Test d'accès admin


## 🌍 Accès local
| Composant | URL par défaut |
|----------|----------------|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000/api/users |
| DB       | PostgreSQL sur port `5433` |

## ✅ Sécurité mise en place
- Hash mot de passe avec `argon2id`
- JWT stocké côté client et supprimé à la déconnexion
- Protection des routes sensibles par middleware
- Validation des champs avec `express-validator`
- Headers de sécurité avec `helmet`
- CORS configuré
- Contre-pression avec `express-rate-limit`
- Frontend empêche l'accès aux pages protégées sans JWT

## 🧪 Tests et CI
- Tests Jest + Supertest sur les routes principales
- Tests exécutés automatiquement via CI (GitHub Actions)
- Lancement local : `npm test`
- Base dédiée `diary_test`
- Pipeline GitHub Actions : **tests + sécurité**
- Badge CI : ✅ Affiché en haut du README


## 🔎 OWASP & Sécurité
- ✅ OWASP Dependency-Check (via GitHub Actions)
- ✅ Mitigation CVE-2024-10491 (sanitizeHeader)
- ✅ Analyse CIA : Intégrité, Confidentialité, Disponibilité
- ✅ Contre XSS, bruteforce, BAC, privilèges


## 📄 Documentation API
- Générée avec Swagger (`/swagger` route locale)
- Endpoint : `http://localhost:3000/api-docs`
- Export HTML généré automatiquement : `docs/swagger.html

## 📦 Bonus réalisés ✅
- Design moderne côté frontend - TailwindCSS (responsive)
- Tests unitaires + intégration - Tests automatisés (Jest + CI)
- Pipeline CI/CD GitHub Actions 
- Dockerisation complète - frontend/backend/DB
- Architecture logicielle claire (MVC, middlewares, routes)
- Respect des bonnes pratiques (validation, séparation des rôles, hash sécurisé)
- Badge CI
- Infrastructure Terraform
- Scan OWASP automatisé (rapport HTML


## 👤 Auteur
- Nom : Ba Issiakha
- Projet encadré par Boris Rose
