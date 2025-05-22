#!/bin/sh

# Attendre que PostgreSQL soit prêt
echo "Attente de la base de données PostgreSQL..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo " Base PostgreSQL détectée, lancement des migrations..."

# Appliquer les migrations Sequelize
npx sequelize-cli db:migrate

# Lancer le serveur
echo "🚀 Lancement du serveur Node.js"
node server.js
