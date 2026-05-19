# Stage 1: Build the frontend React/Vite assets
FROM node:20-alpine AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production PHP/Nginx environment using optimized ServersideUp image
FROM serversideup/php:8.4-fpm-nginx

# Switch to root to configure the container webroot
USER root

# Configure Nginx to point directly to Laravel's public directory
ENV NGINX_WEBROOT="/var/www/html/public"

# Switch back to the unprivileged application user (9999) for strict production security
USER 9999

# Copy all application files
COPY --chown=9999:9999 . .

# Copy compiled frontend assets from the node-builder stage
COPY --from=node-builder --chown=9999:9999 /app/public/build ./public/build

# Run production composer autoloader optimization
RUN composer install --no-dev --optimize-autoloader --no-interaction
