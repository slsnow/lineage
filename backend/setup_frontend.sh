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
  npm start
fi
