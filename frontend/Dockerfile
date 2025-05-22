# Étape 1 : build de l'application
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Étape 2 : serveur nginx pour servir le frontend
FROM nginx:alpine

# Copie la build dans nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie une config nginx personnalisée (optionnel)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
