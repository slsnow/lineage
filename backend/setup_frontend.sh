#!/bin/bash

DEPLOYMENT=$1
HOSTNAME=$2

cd ../frontend/

# Install dependencies and build the frontend
npm install

if [ "$DEPLOYMENT" == "PROD" ]; then
  npm run build
  ./setup_nginx.sh $2 > lineage_setup.log 2>&1
else
  echo "Navigate to the frontend directory: cd ../frontend/"
  echo "Run the development server: npm start"
fi
