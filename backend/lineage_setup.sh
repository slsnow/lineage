#!/bin/bash

DEPLOYMENT=$1
HOSTNAME=$2
./setup_frontend.sh $DEPLOYMENT

# Run the setup_postgresql.sh script
./setup_postgresql.sh > lineage_setup.log 2>&1

# Install npm packages
npm install express pg dotenv react-router-dom >> lineage_setup.log 2>&1

# Start the server as a background process
nohup node index.js >> server.log 2>&1 &

# Setup the frontend development server
nohup setup_frontend.sh >> server.log 2>&1 &
