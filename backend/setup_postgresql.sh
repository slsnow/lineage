#!/bin/bash

# Load configuration variables from file or set defaults
if [ -f lineage.conf ]; then
    source lineage.conf
else
    DB_USER="lineage"
    DB_PASS="lineage"
    DB_NAME="lineage"
fi

# Install PostgreSQL
sudo zypper refresh
sudo zypper install postgresql-server

# Edit pg_hba.conf
sudo cp /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf.backup
sudo awk '/^local[[:blank:]]/ && !x {print "local   all             postgres                                peer"; print "local   all             lineage                                 md5"; x=1} 1' /var/lib/pgsql/data/pg_hba.conf.backup | sudo tee /var/lib/pgsql/data/pg_hba.conf


sudo sed -i "1i local   all             postgres                                peer" /var/lib/pgsql/data/pg_hba.conf
sudo sed -i "1i local   all             lineage                                 md5" /var/lib/pgsql/data/pg_hba.conf

# Initialize PostgreSQL
sudo systemctl enable --now postgresql
sudo systemctl restart postgresql

# Create a PostgreSQL user and database
sudo su - postgres -c "psql -c \"CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';\""
sudo su - postgres -c "psql -c \"CREATE DATABASE $DB_NAME OWNER $DB_USER;\""
sudo su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;\""

# Create the people table
sudo su - postgres -c "psql -U $DB_USER -d $DB_NAME -c 'CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    gedcom_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    name_suffix VARCHAR(20),
    nickname VARCHAR(100),
    gender CHAR(1),
    father_id INTEGER REFERENCES people(id),
    mother_id INTEGER REFERENCES people(id)
);'"

# Create the events table
sudo su - postgres -c "psql -U $DB_USER -d $DB_NAME -c 'CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES people(id),
    event_type VARCHAR(20),
    date DATE,
    place VARCHAR(100),
    details TEXT
);'"

# Create the relationships table
sudo su - postgres -c "psql -U $DB_USER -d $DB_NAME -c 'CREATE TABLE relationships (
    id SERIAL PRIMARY KEY,
    person1_id INTEGER REFERENCES people(id),
    person2_id INTEGER REFERENCES people(id),
    relationship_type VARCHAR(20)
);'"

# Create the sources table
sudo su - postgres -c "psql -U $DB_USER -d $DB_NAME -c 'CREATE TABLE sources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    publication_info TEXT,
    repository_info TEXT,
    text TEXT,
    url VARCHAR(255)
);'"

# Create the notes table
sudo su - postgres -c "psql -U $DB_USER -d $DB_NAME -c 'CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    note_text TEXT
);'"

# Create the media table
sudo su - postgres -c "psql -U $DB_USER -d $DB_NAME -c 'CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    file_path VARCHAR(255),
    format VARCHAR(50),
    type VARCHAR(50)
);'"

# Create tables to link sources, notes, and media to events., etc.