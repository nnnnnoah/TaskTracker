# Build the Vite assets.
FROM node:22-bookworm-slim AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Install PHP dependencies and run Laravel.
FROM php:8.3-cli-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends libicu-dev libpq-dev libzip-dev \
    && docker-php-ext-install -j"$(nproc)" bcmath intl opcache pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install production dependencies separately to improve Docker build caching.
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts --optimize-autoloader

COPY . .
COPY --from=frontend /app/public/build ./public/build

# Run Laravel's package discovery after the application source is present.
RUN composer dump-autoload --no-dev --optimize \
    && chown -R www-data:www-data storage bootstrap/cache

ENV APP_ENV=production
ENV APP_DEBUG=false

EXPOSE 10000

# Render supplies PORT. The fallback is useful for local Docker runs.
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]
