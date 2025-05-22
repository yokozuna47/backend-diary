# 🔧 Étape 1 : Image de base
FROM node:18-alpine

# 📁 Étape 2 : Creation du dossier de l'app dans le conteneur
WORKDIR /app

# 📦 Étape 3 : Copie des fichiers package.json
COPY package*.json ./

# 📦 Étape 4 : Install des dependances
RUN npm install

# 📁 Étape 5 : Copie le reste du code dans /app
COPY . .

# 🌍 Étape 6 : Exposer le port de l'app
EXPOSE 3000

# ▶️ Étape 7 : Démarrer le serveur
CMD ["node", "server.js"]

#####################################################

# correction de l'erreur nc  not found
RUN apk update && apk add netcat-openbsd

# Copier le script
COPY entrypoint.sh /app/entrypoint.sh

# Rendre exécutable dans l'image Docker
RUN chmod +x /app/entrypoint.sh

# Lancer ce script comme point d'entrée
CMD ["/app/entrypoint.sh"]
