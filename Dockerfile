# Étape de build : Utilisation de l'image officielle Node.js
FROM node:20.15.1-slim AS build

# Définir le répertoire de travail
WORKDIR /usr/app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances en utilisant npm
RUN npm install --production

# Copier le reste des fichiers de l'application
COPY . .

# Définir une variable d'argument pour passer l'URL de base de l'API
ARG VITE_API_BASE_URL

# Définir la variable d'environnement
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL:-'http://87.106.87.104:3215'}

# Construire l'application pour la production
RUN npm run build

# Étape de production : Utilisation de l'image stable de NGINX
FROM nginx:stable-alpine

# Copier les fichiers générés vers le dossier de distribution NGINX
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Copier la configuration NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80 pour permettre l'accès HTTP
EXPOSE 80

# Lancer NGINX en mode non-détaché
CMD ["nginx", "-g", "daemon off;"]
