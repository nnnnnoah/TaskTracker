# Install PHP dependencies and build/run Laravel. The Vite Wayfinder plugin
# invokes `php artisan wayfinder:generate`, so PHP and Composer must be present
# while the frontend assets are built.
FROM php:8.3-cli-bookworm

COPY --from=node:22-bookworm-slim /usr/local/ /usr/local/

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

# Run Laravel's package discovery after the application source is present.
RUN composer dump-autoload --no-dev --optimize \
    && chown -R www-data:www-data storage bootstrap/cache

# Build Vite assets after PHP, Composer dependencies, and the app source exist.
RUN npm ci && npm run build

ENV APP_ENV=production
ENV APP_DEBUG=false

EXPOSE 10000

# Render supplies PORT. The fallback is useful for local Docker runs.
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]
