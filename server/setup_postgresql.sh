#!/bin/bash

# Load configuration variables from file or set defaults
if [ -f config.conf ]; then
    source db_config.conf
else
    POSTGRES_USER="postgres"
    POSTGRES_DB="lineage_db"
fi

# Install PostgreSQL
sudo zypper refresh
sudo zypper install postgresql-server

# Initialize PostgreSQL
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Create a PostgreSQL database
sudo su - postgres -c "psql -c \"CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER;\""
sudo su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;\""

# Create the people table
sudo su - postgres -c "psql -U $POSTGRES_USER -d $POSTGRES_DB -c 'CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    gedcom_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender CHAR(1),
    birth_date DATE,
    birth_place VARCHAR(100),
    death_date DATE,
    death_place VARCHAR(100)
);'"

echo "PostgreSQL setup is complete."
