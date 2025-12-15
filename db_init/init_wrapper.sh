#!/bin/bash
set -e

DB_NAME="$POSTGRES_DB" 
MIGRATIONS_DIR="/docker-entrypoint-initdb.d/migrations"
SEEDS_DIR="/docker-entrypoint-initdb.d/seeds"

# --- Wait for the target database (which is automatically created by the main entry point) to be ready ---
echo "Waiting for database '$DB_NAME' to be ready for connections..."
until psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
echo "Postgres is up - executing initialization scripts"

# --- Running database migrations ---
echo "--- Running database migrations ---"
for f in $(find ${MIGRATIONS_DIR} -type f -name "*.sql" | sort -n); do
    echo "Running migration $f"
    # Now connect to the guaranteed-to-exist $DB_NAME
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" -f "$f"
done

# --- Running database seeds ---
echo "--- Running database seeds ---"
for f in $(find ${SEEDS_DIR} -type f -name "*.sql" | sort -n); do
    echo "Running seed $f"
    # Now connect to the guaranteed-to-exist $DB_NAME
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" -f "$f"
done

echo "--- Database initialization complete ---"