zypper refresh
zypper install -y rsyslog git nodejs14 npm14 wget postgresql-server
zypper patch -y

# Start/Enable Postgresql
systemctl enable --now postgresql.service

# Create the directory and set permissions
mkdir -p /opt/lineage

# Clone the Public Github Repo
git clone https://github.com/slsnow/lineage.git /opt/lineage

# Change to the server directory and run the lineage_setup.sh script
cd /opt/lineage/server
chmod +x lineage_setup.sh
./lineage_setup.sh