zypper refresh
zypper install -y rsyslog git nodejs14 npm14 wget postgresql-server nginx
zypper patch -y

# Start/Enable Postgresql and Nginx
systemctl enable --now postgresql.service nginx.service

# Create the directory and set permissions
mkdir -p /opt/lineage

# Clone the specified branch of the Public Github Repo
git clone -b "$BRANCH" https://github.com/slsnow/lineage.git /opt/lineage



# Change to the backend directory
cd /opt/lineage/backend

# Prepare lineage.conf

# Update HOSTNAME in lineage.conf if different from the passed value
if ! grep -q "HOSTNAME=\"$HOSTNAME\"" lineage.conf; then
    if grep -q "^HOSTNAME=" lineage.conf; then
        # If HOSTNAME exists, update the value
        sed -i "s/^HOSTNAME=.*/HOSTNAME=\"$HOSTNAME\"/" lineage.conf
    else
        # If HOSTNAME doesn't exist, append it
        echo "HOSTNAME=\"$HOSTNAME\"" >> lineage.conf
    fi
fi

# Update DEPLOYMENT in lineage.conf if different from the passed value
if ! grep -q "DEPLOYMENT=\"$DEPLOYMENT\"" lineage.conf; then
    if grep -q "^DEPLOYMENT=" lineage.conf; then
        # If DEPLOYMENT exists, update the value
        sed -i "s/^DEPLOYMENT=.*/DEPLOYMENT=\"$DEPLOYMENT\"/" lineage.conf
    else
        # If DEPLOYMENT doesn't exist, append it
        echo "DEPLOYMENT=\"$DEPLOYMENT\"" >> lineage.conf
    fi
fi


# Set Permissions and Run "lineage_setup.sh"

chmod +x lineage_setup.sh
chmod +x setup_postgresql.sh
chmod +x setup_frontend.sh
chmod +x setup_nginx.sh
sudo ./lineage_setup.sh "$DEPLOYMENT"