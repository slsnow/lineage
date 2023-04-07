#!/bin/bash

# Run the setup_postgresql.sh script
./setup_postgresql.sh > lineage_setup.log 2>&1

# Install npm packages
npm install express pg dotenv >> lineage_setup.log 2>&1

# Start the server as a background process
nohup node index.js >> server.log 2>&1 &