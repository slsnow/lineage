#!/bin/bash

read -p "Enter PostgreSQL username: " POSTGRES_USER
read -p "Enter PostgreSQL password: " POSTGRES_PASS
read -p "Enter PostgreSQL database name: " POSTGRES_DB

# Install PostgreSQL
sudo zypper refresh
sudo zypper install postgresql-server

# Initialize PostgreSQL
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Create a PostgreSQL user and database
sudo su - postgres -c "psql -c \"CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASS';\""
sudo su - postgres -c "psql -c \"CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER;\""
sudo su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;\""

echo "PostgreSQL setup is complete."
