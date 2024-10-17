# Use the official Node.js image.
FROM node:20.15.1-slim AS build

# Create and change to the app directory.
WORKDIR /usr/app

# This command uses package.json to install dependencies.
COPY package.json ./ 

# Install app dependencies using the `npm install` command.
RUN npm install

# Copy the app files to the container.
COPY . .

# ARG to allow passing the base URL during build
ARG VITE_API_BASE_URL

# Set the environment variable using the passed ARG or default
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL:-'http://87.106.87.104:3215'}

# Optional: Display the variable value for debugging purposes
RUN echo "VITE_API_BASE_URL is set to: $VITE_API_BASE_URL"

# Build the application
RUN npm run build

# Serve with NGINX
FROM nginx:stable
COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]