#!/bin/bash

HOSTNAME=$1
APP_NAME="lineage_app"

# Create the sites-enabled directory if it doesn't exist
sudo mkdir -p /etc/nginx/sites-enabled

# Create a new nginx configuration file for your application
cat << EOF | sudo tee /etc/nginx/sites-available/$APP_NAME
server {
    listen 80;
    server_name $HOSTNAME;

    root /opt/lineage/frontend/build;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Create a symbolic link in the sites-enabled directory
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/

# Test the nginx configuration
sudo nginx -t

# Reload the nginx service
sudo systemctl reload nginx