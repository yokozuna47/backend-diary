# 🔧 Étape 1 : Image de base
FROM node:18

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
