# Stage 1: Build the frontend React/Vite assets
FROM node:20-alpine AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Production PHP/Nginx environment using optimized ServersideUp image
FROM serversideup/php:8.4-fpm-nginx

# Switch to root to configure the container webroot
USER root

# Configure Nginx to point directly to Laravel's public directory
ENV NGINX_WEBROOT="/var/www/html/public"

# Copy all application files (as root)
COPY . .

# Copy compiled frontend assets from the node-builder stage (as root)
COPY --from=node-builder /app/public/build ./public/build

# Run production composer autoloader optimization (as root)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Ensure all files are owned by the unprivileged web user (webuser:webgroup / 9999:9999)
RUN chown -R webuser:webgroup /var/www/html

# Switch back to the unprivileged application user for strict production security
USER 9999
